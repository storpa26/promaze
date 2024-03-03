import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase();
        const currentUserEmail = req.query.currentUserEmail;
        // will get all the request
        if (currentUserEmail) {
            const myTeams = await db
                .collection("projects")
                .find({ supervisor: { $in: [currentUserEmail] } })
                .toArray();
            res.status(200).json(myTeams);
        } else {
            const allProjects = await db
                .collection("projects")
                .find({})
                .toArray();
            res.status(200).json(allProjects);
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
}
