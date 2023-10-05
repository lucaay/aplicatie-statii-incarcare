"use client";
import { useLoadScript } from "@react-google-maps/api";
import clientPromise from "@/lib/mongodb";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ChargersCon } from "@/types/mapComponentsTypes";
import MapComponent from "@/components/MapComponent/MapComponent";

export const getServerSideProps: GetServerSideProps<ChargersCon> = async () => {
    try {
        const client = await clientPromise;
        const db = client.db("car-chargers");

        const chargers = await db
            .collection("car-chargers-info")
            .find({})
            .toArray();

        return {
            props: {
                isConnected: true,
                chargers: JSON.parse(JSON.stringify(chargers)),
            },
        };
    } catch (e) {
        console.error(e);
        return {
            props: { isConnected: false },
        };
    }
};

export default function Map({
    isConnected,
    chargers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    if (!isLoaded) return <div>Se incarca harta...</div>;
    return (
        <>
            {isConnected ? (
                <MapComponent chargers={chargers} />
            ) : (
                <h2>A aparut o eroare la conectarea la baza de date. Incearca un refresh</h2>
            )}
        </>
    );
}
