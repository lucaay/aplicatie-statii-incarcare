import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Charger } from "@/types/mapComponentsTypes";
import ChargerInfoText from "./ChargerInfoText/ChargerInfoText";
import styles from "./chargerInfoModal.module.scss";
import { Button, Icon, IconButton, Rating } from "@mui/material";
import { plugScoreRatingChange } from "../../functions/modalFunctions";
import CrowdingLevelModal from "./CrowdingLevelModal/CrowdingLevelModal";
import Alert from "@mui/material/Alert";
import { useCallback, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import updateChargerStartStatus, {
    updateChargerStartStatusProps,
} from "@/pages/api/chargerStart";
import { useApiRequest } from "@/hooks/useApiRequest";
import { ObjectId } from "mongodb";

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
    chargerID?: Charger["_id"];
}

export default function ChargerInfoModal({
    open = false,
    setOpen,
    chargerID,
}: ChargerInfoModalProps) {
    const handleClose = () => {
        setOpen(false);
    };
    const [alertOptions, setAlertOptions] = useState<{
        text: string;
        type: "success" | "error";
    } | null>(null);

    const [
        getChargerFn,
        { data: charger, loading: loadingCharger, error: chargerError },
    ] = useApiRequest<Charger>("/api/getCharger", "POST");

    const [updateChargerStartStatusFn, { data, loading, error }] =
        useApiRequest<void, Partial<updateChargerStartStatusProps>>(
            "/api/chargerStart",
            "PATCH"
        );

    useEffect(() => {
        chargerID && getChargerFn({ _id: chargerID });
    }, [chargerID, getChargerFn, data]);

    useEffect(() => {
        if (data) {
            setAlertOptions({
                text: "Charger status updated successfully",
                type: "success",
            });
        }
    }, [data, loading, error]);

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={styles["modal"]}
            >
                {!charger || loadingCharger ? (
                    <Box sx={customStyle}>
                        <Typography id="modal-modal-title" variant="h5">
                            Se incarca...
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={customStyle}>
                        <div className={styles["modal-title-container"]}>
                            <Typography id="modal-modal-title" variant="h5">
                                {charger.name}
                            </Typography>
                            <Button
                                disabled={loading}
                                onClick={() =>
                                    updateChargerStartStatusFn({
                                        _id: charger._id,
                                        newChargerStatus:
                                            !charger.chargerStatus,
                                    })
                                }
                            >
                                {charger.chargerStatus ? "stop" : "start"}
                            </Button>

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
                        <ChargerInfoText
                            label={"Adresa"}
                            value={charger.address}
                        />
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
                                charger={charger}
                                setAlertOptions={setAlertOptions}
                            />
                        </div>
                        <ChargerInfoText
                            label={"Descriere"}
                            value={charger.description}
                        />
                    </Box>
                )}
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
