import { connectToDatabase } from "../../lib/mongodb";
const { ObjectId } = require("mongodb");

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase();
        const taskCollection = db.collection("tasks");

        const taskId = req.body.taskId;
        const taskStatus = req.body.taskStatus;
        // Change task status
        const task = await taskCollection.updateOne(
            { _id: ObjectId(taskId) },
            { $set: { status: taskStatus } }
        );
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
}
