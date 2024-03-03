import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase();
        // will get all the users except the current user

        const currentUserEmail = req.query.currentUserEmail;
        if (currentUserEmail) {
            const userCollection = await db
                .collection("users")
                .find({ email: currentUserEmail })
                .toArray();

            res.status(200).json(userCollection);
        } else {
            const userCollection = await db
                .collection("users")
                .find({})
                .toArray();
            res.status(200).json(userCollection);
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
}
