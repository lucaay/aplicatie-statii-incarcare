import assert from "assert";
import clientPromise from "../../lib/mongodb";
import mongoDB, { ObjectId } from "mongodb";

export type getChargerProps = {
    _id: ObjectId;
};

export default async function handler(req: any, res: any) {
    const client = await clientPromise;
    const db = client.db("car-chargers");
    const collection = db.collection("car-chargers-info");

    switch (req.method) {
        case "POST":
            let bodyObject: getChargerProps = JSON.parse(req.body);
            let charger = await collection
                .find({
                    _id: new ObjectId(bodyObject._id),
                })
                .toArray();

            return res.json(charger[0]);
    }
}
