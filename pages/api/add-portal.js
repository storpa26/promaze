import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase();
        const portalCollection = db.collection("portal");
        const portal_info = req.body;

        // adding portal to "projectCollection"
        await portalCollection.insertOne(portal_info);
        res.status(200).json({ message: "new portal added" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
}
