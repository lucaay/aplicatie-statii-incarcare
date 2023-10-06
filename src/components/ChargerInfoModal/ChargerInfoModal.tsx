import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Charger } from "@/types/mapComponentsTypes";
import ChargerInfoText from "./ChargerInfoText/ChargerInfoText";
import styles from "./chargerInfoModal.module.scss";
import { Icon, IconButton, Rating } from "@mui/material";
import { plugScoreRatingChange } from "@/functions/modalFunctions";
import CrowdingLevelModal from "./CrowdingLevelModal/CrowdingLevelModal";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const customStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "75%", sm: "70%", md: "40%", lg: "35%" },
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

interface ChargerInfoModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    charger: Charger;
}

export default function ChargerInfoModal({
    open = false,
    setOpen,
    charger,
}: ChargerInfoModalProps) {
    const handleClose = () => setOpen(false);
    const [alertOptions, setAlertOptions] = useState<{
        text: string;
        type: "success" | "error";
    } | null>(null);

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={styles["modal"]}
            >
                <Box sx={customStyle}>
                    <div className={styles["modal-title-container"]}>
                        <Typography id="modal-modal-title" variant="h5">
                            {charger.name}
                        </Typography>
                        <Rating
                            className={styles["rating-icon"]}
                            name="size-medium"
                            defaultValue={0}
                            onChange={(e, value) => {
                                value &&
                                    plugScoreRatingChange({
                                        newValue: value,
                                        currentValue: charger.plug_score,
                                        setAlertOptions,
                                    });
                
                            }}
                        />
                    </div>

                    <div className={styles["with-edit-div"]}>
                        <ChargerInfoText
                            label={"Scor Statie"}
                            value={charger.plug_score}
                            scoreMaxRating={5}
                        />
                    </div>
                    <ChargerInfoText
                        label={"Porturi disponibile"}
                        value={charger.ports}
                    />
                    <ChargerInfoText label={"Adresa"} value={charger.address} />
                    <ChargerInfoText
                        label={"Pret"}
                        value={charger.price_info}
                    />
                    <div className={styles["with-edit-div"]}>
                        <ChargerInfoText
                            label={"Nivel Aglomeratie"}
                            value={charger.crowding_level}
                            scoreMaxRating={5}
                        />
                        <CrowdingLevelModal
                            crowdingLevel={charger.crowding_level}
                            setAlertOptions={setAlertOptions}
                        />
                    </div>
                    <ChargerInfoText
                        label={"Descriere"}
                        value={charger.description}
                    />
                </Box>
            </Modal>
            {alertOptions && (
                <Alert
                    severity={alertOptions?.type}
                    onClose={() => setAlertOptions(null)}
                    className={styles["alert"]}
                >
                    {alertOptions.text}
                </Alert>
            )}
        </>
    );
}
