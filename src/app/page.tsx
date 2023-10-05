"use client";
import { useMemo } from "react";
import styles from "./page.module.scss";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

export default function Home() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

function Map() {
    // Romania's center coordinates
    const romanianCenter = useMemo(() => ({ lat: 45.9432, lng: 24.9668 }), []);
    return (
        <GoogleMap
            zoom={10}
            center={romanianCenter}
            mapContainerClassName={styles["map-container"]}
        >
            <MarkerF position={romanianCenter} />
        </GoogleMap>
    );
}
