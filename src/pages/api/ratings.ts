import clientPromise from "../../lib/mongodb";
import mongoDB from "mongodb";

export default async function updateCrowdingLevel({
    _id,
    currentValue,
    newValue,
    setAlertOptions,
}: {
    _id: mongoDB.BSON.ObjectId;
    currentValue: number;
    newValue: number;
    setAlertOptions: React.Dispatch<
        React.SetStateAction<{
            text: string;
            type: "success" | "error";
        } | null>
    >;
}) {
    // const client = await clientPromise;
    // const db = client.db("car-chargers");

    // Calculate the new crowding level
    const newLevel = Math.round((currentValue + newValue) / 2);

    try {
        // Update the crowding level in the database
        // const result = await db.collection("car-chargers-info").updateOne(
        //     { _id },
        //     {
        //         $set: {
        //             crowding_level: newLevel,
        //         },
        //     }
        // );

        // if (result.modifiedCount > 0) {
        //     setAlertOptions({
        //         text: "Nivelul de aglomeratie a fost actualizat cu succes!",
        //         type: "success",
        //     });
        // } else {
        //     setAlertOptions({
        //         text: "Nivelul de aglomeratie nu a putut fi actualizat cu succes!",
        //         type: "error",
        //     });
        // }
    } catch (error) {
        console.error("Error updating crowding level:", error);
        setAlertOptions({
            text: "Nivelul de aglomeratie nu a putut fi actualizat cu succes!",
            type: "error",
        });
    }
}
