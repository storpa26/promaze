import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase();
        const projectCollection = db.collection("projects");
        const userCollection = db.collection("users");

        const currentUserEmail = req.body.currentUserEmail;
        const currentUserName = req.body.currentUserName;
        const userRole = req.body.userRole;
        const requestTeamId = req.body.teamId;

        // Get current user
        const user = await userCollection.findOne({
            email: currentUserEmail,
        });

        if (userRole === "student") {
            if (user.teamStatus === undefined) {
                // Not in a team
                // Check if the project memeber
                const projectObject = await projectCollection.findOne({
                    teamId: requestTeamId,
                });
                // If a new member or if the member list is less than 2 add new member
                if (
                    projectObject.members === undefined ||
                    projectObject.members.length < 2
                ) {
                    // Add teamStatus to user
                    await userCollection.updateOne(
                        { email: currentUserEmail },
                        {
                            $set: { teamStatus: requestTeamId },
                            $pull: { teamRequests: { teamId: requestTeamId } },
                        }
                    );
                    // Add member to project and Remove request from 'teammateRequest'
                    await projectCollection.updateOne(
                        { teamId: requestTeamId },
                        {
                            $push: {
                                members: {
                                    email: currentUserEmail,
                                    name: currentUserName,
                                },
                            },
                            $pull: { teammateRequest: currentUserEmail },
                        }
                    );

                    res.status(200).json({
                        message: `Successfully joined ${req.body.projectTitle}`,
                    });
                } else {
                    res.status(200).json({ message: "Team member fulfilled" });
                }
            } else {
                // Already in a team
                res.status(200).json({ message: "You are already in a team" });
            }
        } else if (userRole === "teacher") {
            // Add member to project and Remove request from 'teammateRequest'
            await projectCollection.updateOne(
                { teamId: requestTeamId },
                {
                    $push: { supervisor: currentUserEmail },
                    $pull: { supervisorPreference: currentUserEmail },
                }
            );
            // removing supervisor request
            await userCollection.updateOne(
                { email: currentUserEmail },
                {
                    $push: { supervising: requestTeamId },
                    $pull: { teamRequests: { teamId: requestTeamId } },
                }
            );

            res.status(200).json({
                message: `${req.body.projectTitle} has been approved by you`,
            });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
}
