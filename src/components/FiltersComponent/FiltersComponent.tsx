import { Filters } from "@/types/mapComponentsTypes";
import {
    Box,
    Button,
    Checkbox,
    Slider,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import styles from "./filtersComponent.module.scss";

interface FiltersComponentProps {
    setFilters: React.Dispatch<React.SetStateAction<Filters | null>>;
    filters: Filters | null;
}

const FiltersComponent = ({ setFilters, filters }: FiltersComponentProps) => {
    const [localFilters, setLocalFilters] = React.useState<Filters | null>(
        null
    );

    //TODO: REMOVE THIS
    console.log(filters);

    return (
        <div className={styles["filtersContainer"]}>
            <h2 className={styles["title"]}>Harta Statii Incarcare EV</h2>
            {filters ? (
                <p style={{ backgroundColor: "red" }}>Aveti filtre aplicate!</p>
            ) : (
                <p style={{ backgroundColor: "black" }}>
                    Nu exista filtre aplicate. Apasa butonul &lsquo;Filtreaza
                    Statiile&rsquo; pentru a le aplica.
                </p>
            )}
            <div className={styles["filters"]}>
                <h3>Filtre</h3>
                <div className={styles["filter-part"]}>
                    <TextField
                        id="outlined-basic"
                        label="Nume Statie"
                        variant="outlined"
                        onChange={(e) => {
                            setLocalFilters({
                                ...localFilters,
                                name: e.target.value,
                            });
                        }}
                        size="small"
                        sx={{ width: "100%" }}
                    />
                </div>
                <div className={styles["filter-part"]}>
                    <Typography gutterBottom variant="h6" width="100%">
                        Scor Statie
                    </Typography>

                    <Slider
                        aria-label="Scor Statie"
                        valueLabelDisplay="auto"
                        step={1}
                        onChange={(e, value) => {
                            setLocalFilters({
                                ...localFilters,
                                plug_score: value as number,
                            });
                        }}
                        marks
                        min={1}
                        max={5}
                    />
                </div>
                <div className={styles["filter-part"]}>
                    <TextField
                        id="outlined-basic"
                        label="Porturi"
                        variant="outlined"
                        onChange={(e) => {
                            setLocalFilters({
                                ...localFilters,
                                ports: e.target.value,
                            });
                        }}
                        size="small"
                        sx={{ width: "100%" }}
                    />
                </div>
                <div className={styles["filter-part"]}>
                    <TextField
                        id="outlined-basic"
                        label="Adresa"
                        variant="outlined"
                        onChange={(e) => {
                            setLocalFilters({
                                ...localFilters,
                                address: e.target.value,
                            });
                        }}
                        size="small"
                        sx={{ width: "100%" }}
                    />
                </div>
                <div className={styles["filter-part"]}>
                    <TextField
                        id="outlined-basic"
                        label="Info Pret"
                        variant="outlined"
                        onChange={(e) => {
                            setLocalFilters({
                                ...localFilters,
                                price_info: e.target.value,
                            });
                        }}
                        size="small"
                        sx={{ width: "100%" }}
                    />
                </div>
            </div>
            <div className={styles["filterButtons"]}>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => setFilters(localFilters)}
                >
                    Filtreaza statiile
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setFilters(null)}
                >
                    Sterge filtrele
                </Button>
            </div>
        </div>
    );
};

export default FiltersComponent;
