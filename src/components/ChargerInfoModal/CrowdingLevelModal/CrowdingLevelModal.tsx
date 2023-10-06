import { Box, Button, Modal, Rating, Typography } from "@mui/material";
import React from "react";
import styles from "./crowdingLevelModal.module.scss";
import { crowdingLevelChange } from "@/functions/modalFunctions";
import BorderColorIcon from "@mui/icons-material/BorderColor";

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

interface CrowdingLevelModalProps {
    crowdingLevel: number;
    setAlertOptions: React.Dispatch<
        React.SetStateAction<{
            text: string;
            type: "success" | "error";
        } | null>
    >;
}

const CrowdingLevelModal = ({
    crowdingLevel,
    setAlertOptions,
}: CrowdingLevelModalProps) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <BorderColorIcon
                className={styles["edit-icon"]}
                onClick={() => handleOpen()}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                className={styles["modal"]}
            >
                <Box sx={{ ...customStyle, width: 200 }}>
                    <div className={styles["modal-title-container"]}>
                        <Typography id="modal-modal-title" variant="h5">
                            Nivel Aglomeratie
                        </Typography>
                        <Rating
                            className={styles["rating-icon"]}
                            name="size-medium"
                            defaultValue={0}
                            onChange={(e, value) => {
                                value &&
                                    crowdingLevelChange({
                                        newValue: value,
                                        currentValue: crowdingLevel,
                                        setAlertOptions,
                                    });
                                setOpen(false);
                            }}
                        />
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default CrowdingLevelModal;
