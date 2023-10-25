import assert from "assert";
import clientPromise from "../../lib/mongodb";
import mongoDB, { ObjectId } from "mongodb";

export type updateChargerStartStatusProps = {
    _id: mongoDB.BSON.ObjectId;
    newChargerStatus: boolean;
};

export default async function handler(req: any, res: any) {
    const client = await clientPromise;
    const db = client.db("car-chargers");
    const collection = db.collection("car-chargers-info");

    switch (req.method) {
        case "PATCH":
            let bodyObject: updateChargerStartStatusProps = JSON.parse(
                req.body
            );
            let charger = await collection.findOneAndUpdate(
                { _id: new ObjectId(bodyObject._id) },
                {
                    $set: {
                        chargerStatus: bodyObject.newChargerStatus,
                    },
                },
                {
                    returnDocument: "after",
                }
            );

            return res.json(charger);
    }
}
