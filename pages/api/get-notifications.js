import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase();
        // will get all the request
        const allNotifications = await db
            .collection("notifications")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();
        res.status(200).json(allNotifications);
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
}
