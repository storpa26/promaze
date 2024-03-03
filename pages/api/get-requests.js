import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    const currentUserEmail = req.query.currentUserEmail;
    // will get all the request
    const teamRequest = await db
        .collection("users")
        .find({ email: currentUserEmail })
        .project({ teamRequests: 1, _id: 0 })
        .toArray();

    res.status(200).json(teamRequest[0].teamRequests);
}
