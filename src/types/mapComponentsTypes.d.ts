export type Charger = {
    _id: string;
    name: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    plug_score: number;
    ports: string;
    address: string;
    price_info: string;
    crowding_level: number;
    description: string;
};

export type ChargersCon = {
    isConnected: boolean;
    chargers?: Charger[];
};
