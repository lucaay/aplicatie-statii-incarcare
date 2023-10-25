"use client";
import { useLoadScript } from "@react-google-maps/api";
import clientPromise from "@/lib/mongodb";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Charger, ChargersCon, Filters } from "@/types/mapComponentsTypes";
import MapComponent from "@/components/MapComponent/MapComponent";
import FiltersComponent from "@/components/FiltersComponent/FiltersComponent";
import styles from "./map.module.scss";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps<ChargersCon> = async () => {
    try {
        const client = await clientPromise;
        const db = client.db("car-chargers");

        const chargers = await db
            .collection("car-chargers-info")
            .find(
                {},
                {
                    projection: {
                        _id: 1,
                        coordinates: 1,
                        plug_score: 1,
                        name: 1,
                        ports: 1,
                        address: 1,
                        price_info: 1,
                    },
                }
            )
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
    const [filteredChargers, setFilteredChargers] = useState<Charger[] | null>(
        null
    );
    const [filters, setFilters] = useState<Filters | null>(null);

    useEffect(() => {
        if (chargers && filters) {
            const filteredChargers = chargers.filter((charger) => {
                // Initialize a variable to check if all filter conditions match
                let matchesAllFilters = true;

                // Check each filter condition individually
                if (
                    filters.name &&
                    !charger.name
                        .toLowerCase()
                        .includes(filters.name.toLowerCase())
                ) {
                    matchesAllFilters = false;
                }
                if (
                    filters.plug_score &&
                    charger.plug_score !== filters.plug_score
                ) {
                    matchesAllFilters = false;
                }
                if (
                    filters.ports &&
                    !charger.ports
                        .toLowerCase()
                        .includes(filters.ports.toLocaleLowerCase())
                ) {
                    matchesAllFilters = false;
                }
                if (
                    filters.address &&
                    !charger.address
                        .toLowerCase()
                        .includes(filters.address.toLowerCase())
                ) {
                    matchesAllFilters = false;
                }
                if (
                    filters.price_info &&
                    !charger.price_info
                        .toLowerCase()
                        .includes(filters.price_info.toLowerCase())
                ) {
                    matchesAllFilters = false;
                }

                // Return true if all filter conditions match
                return matchesAllFilters;
            });

            setFilteredChargers(filteredChargers);
        } else {
            // If filters are not provided or no chargers, set filteredChargers to the original chargers list
            setFilteredChargers(null);
        }
    }, [filters, chargers]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    if (!isLoaded) return <div>Se incarca harta...</div>;
    return (
        <>
            {isConnected ? (
                <div className={styles["mapContentsLayout"]}>
                    <FiltersComponent
                        setFilters={setFilters}
                        filters={filters}
                    />
                    <MapComponent chargers={filteredChargers || chargers} />
                </div>
            ) : (
                <h2>
                    A aparut o eroare la conectarea la baza de date. Incearca un
                    refresh
                </h2>
            )}
        </>
    );
}
