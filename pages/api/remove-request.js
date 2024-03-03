import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    const projectCollection = db.collection("projects");
    const userCollection = db.collection("users");

    const currentUserEmail = req.body.currentUserEmail;
    const requestTeamId = req.body.teamId;
    // Get the user by email
    const user = await userCollection.findOne({ email: currentUserEmail });
    // remove from user
    const removeFromUser = await userCollection.updateOne(
        { _id: user._id },
        { $pull: { teamRequests: { teamId: requestTeamId } } }
    );

    // Get project from "projects"
    const projectObject = await projectCollection.findOne({
        teamId: requestTeamId,
    });
    // remove from "projects"
    const removeFromProjects = await projectCollection.updateOne(
        { _id: projectObject._id },
        { $pull: { teammateRequest: currentUserEmail } }
    );

    res.status(200).json(removeFromProjects);
}
