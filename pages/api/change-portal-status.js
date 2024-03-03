import { connectToDatabase } from "../../lib/mongodb";
const { ObjectId } = require("mongodb");

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase();
        const portalCollection = db.collection("portal");
        const notificationCOllection = db.collection("notifications");

        const portalId = req.body.taskId;
        const portalStatus = req.body.taskStatus;
        const portalCourseCode = req.body.courseCode;

        let portalMessage;
        if (portalStatus === true) {
            portalMessage =
                "A portal for " + portalCourseCode + " has been opened";
        } else if (portalStatus === false) {
            portalMessage =
                "The portal for " + portalCourseCode + " has been closed";
        }

        // Change task status
        await portalCollection.updateOne(
            { _id: ObjectId(portalId) },
            { $set: { status: portalStatus } }
        );

        const currentDate = new Date();
        const portal_info_notification = {
            message: portalMessage,
            createdAt: currentDate,
        };

        // adding notification
        await notificationCOllection.insertOne(portal_info_notification);
        res.status(200).json({ message: "Portal status changed" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
}
