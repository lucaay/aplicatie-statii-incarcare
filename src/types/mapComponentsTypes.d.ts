export type Charger = {
    _id: ObjectId;
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
    chargerStatus?: boolean;
};

export type ChargersCon = {
    isConnected: boolean;
    chargers?: Charger[];
};

export type Filters = {
    name?: string;
    plug_score?: number;
    ports?: string;
    address?: string;
    price_info?: string;
    crowding_level?: number;
    description?: string;
};
