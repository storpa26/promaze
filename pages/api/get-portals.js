import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase();
        // will get all the portals
        const checkPortal = req.query.checkStatus;
        if (checkPortal) {
            const openedPortal = await db
                .collection("portal")
                .find({ status: true })
                .toArray();
            res.status(200).json(openedPortal);
        } else {
            const allPortals = await db.collection("portal").find({}).toArray();
            res.status(200).json(allPortals);
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
}
