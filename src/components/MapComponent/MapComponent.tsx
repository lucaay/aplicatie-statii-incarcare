import { GoogleMap, MarkerF } from "@react-google-maps/api";
import React, { useMemo, useState } from "react";
import styles from "./mapComponent.module.scss";
import { Charger } from "@/types/mapComponentsTypes";
import ChargerInfoModal from "../ChargerInfoModal/ChargerInfoModal";
import { handleIconBasedOnPlugScore } from "../../functions/mapFunctions";
import { useApiRequest } from "@/hooks/useApiRequest";
import mongoDB, { ObjectId } from "mongodb";

interface MapComponentProps {
    chargers?: Charger[];
}

const MapComponent = ({ chargers }: MapComponentProps) => {
    const [selectedChargerID, setSelectedChargerID] =
        useState<ObjectId | null>();
    const [open, setOpen] = useState(false);

    const handleMarkerClick = (chargerID: ObjectId) => {
        setSelectedChargerID(chargerID);
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
                        onClick={() => handleMarkerClick(charger._id)}
                        label={{
                            text: charger.plug_score.toString(),
                            className: styles["marker-label"],
                        }}
                        icon={handleIconBasedOnPlugScore(charger.plug_score)}
                    />
                ))}
            </GoogleMap>
            <ChargerInfoModal
                open={open}
                setOpen={setOpen}
                chargerID={selectedChargerID}
            />
        </>
    );
};

export default MapComponent;
