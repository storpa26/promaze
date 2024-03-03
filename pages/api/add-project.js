import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase();
        const projectCollection = db.collection("projects");
        const usersCollections = db.collection("users");
        const project_info = req.body;
        const currentUserEmail = req.body.leader.email;

        const teamRequestObject = {
            projectTitle: req.body.projectTitle,
            teamLeader: req.body.leader,
            teamId: req.body.teamId,
        };
        const teammateRequest = req.body.teammateRequest;
        const supervisorRequest = req.body.supervisorPreference;
        const allRequests = teammateRequest.concat(supervisorRequest);

        // adding project to "projectCollection"
        await projectCollection.insertOne(project_info);

        // adding teammate request
        allRequests.forEach(async (request) => {
            await usersCollections.updateOne(
                { email: request.email },
                { $push: { teamRequests: teamRequestObject } }
            );
        });

        // Add teamStatus to Leader
        await usersCollections.updateOne(
            { email: currentUserEmail },
            {
                $set: { teamStatus: req.body.teamId },
            }
        );

        res.status(200).json({ message: "new project added" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
}
