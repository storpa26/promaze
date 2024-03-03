import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    const userCollection = db.collection("tasks");
    const task = req.body;
    const result = await userCollection.insertOne(task);
    res.status(200).json(result);
}
