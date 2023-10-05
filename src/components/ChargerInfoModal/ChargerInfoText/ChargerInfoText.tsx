import { Typography } from "@mui/material";
import React from "react";
import styles from "./chargerInfoText.module.scss";

interface ChargerInfoTextProps {
    label?: string;
    value: string | number;
    scoreMaxRating?: number;
}

const ChargerInfoText = ({
    label,
    value,
    scoreMaxRating,
}: ChargerInfoTextProps) => {
    return (
        <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            <span className={styles["bold_text"]}>{label}:</span> {value}
            {scoreMaxRating && `/${scoreMaxRating}`}
        </Typography>
    );
};

export default ChargerInfoText;
