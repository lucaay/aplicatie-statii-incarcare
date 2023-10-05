import { GoogleMap, MarkerF } from "@react-google-maps/api";
import React, { useMemo, useState } from "react";
import styles from "./mapComponent.module.scss";
import { Charger } from "@/types/mapComponentsTypes";
import ChargerInfoModal from "../ChargerInfoModal/ChargerInfoModal";

interface MapComponentProps {
    chargers?: Charger[];
}

const MapComponent = ({ chargers }: MapComponentProps) => {
    const [open, setOpen] = useState(false);
    const [selectedCharger, setSelectedCharger] = useState<Charger | null>(
        null
    );

    const handleMarkerClick = (charger: Charger) => {
        setSelectedCharger(charger);
        setOpen(true);
    };

    // Romania's center coordinates
    const romanianCenter = useMemo(() => ({ lat: 45.9432, lng: 24.9668 }), []);
    return (
        <>
            <GoogleMap
                zoom={10}
                center={romanianCenter}
                mapContainerClassName={styles["map-container"]}
            >
                {chargers?.map((charger) => (
                    <MarkerF
                        position={charger.coordinates}
                        key={charger._id}
                        onClick={() => handleMarkerClick(charger)}
                    />
                ))}
            </GoogleMap>
            {selectedCharger && (
                <ChargerInfoModal
                    open={open}
                    setOpen={setOpen}
                    charger={selectedCharger}
                />
            )}
        </>
    );
};

export default MapComponent;
