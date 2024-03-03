import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase();
        const teamId = req.query.teamId;
        // will get all the request
        const myTasks = await db
            .collection("tasks")
            .find({ teamId: teamId })
            .toArray();
        res.status(200).json(myTasks);
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
}
