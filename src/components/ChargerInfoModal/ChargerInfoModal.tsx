import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Charger } from "@/types/mapComponentsTypes";
import ChargerInfoText from "./ChargerInfoText/ChargerInfoText";
import styles from "./chargerInfoModal.module.scss";

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

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={styles["modal"]}
        >
            <Box sx={customStyle}>
                <Typography id="modal-modal-title" variant="h5">
                    {charger.name}
                </Typography>
                <ChargerInfoText
                    label={"Scor Statie"}
                    value={charger.plug_score}
                    scoreMaxRating={5}
                />
                <ChargerInfoText
                    label={"Porturi disponibile"}
                    value={charger.ports}
                />
                <ChargerInfoText label={"Adresa"} value={charger.address} />
                <ChargerInfoText label={"Pret"} value={charger.price_info} />
                <ChargerInfoText
                    label={"Nivel Aglomeratie"}
                    value={charger.crowding_level}
                    scoreMaxRating={5}
                />
                <ChargerInfoText
                    label={"Descriere"}
                    value={charger.description}
                />
            </Box>
        </Modal>
    );
}
