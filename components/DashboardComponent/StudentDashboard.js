import React from "react";
import NavBar from "../NavBar";
import NotificationBoard from "../DashboardComponent/Notification/NotificationBoard";
import Messaging from "./Messaging/Messaging";
import ProgressBar from "./StudentDashboardComponent/ProgressBar/ProgressBar";
import ProjectCard from "./StudentDashboardComponent/ProjectCard";
import TeamReqBoard from "./StudentDashboardComponent/TeamRequest/TeamReqBoard";
import { useAuth } from "../../context/AuthProvider";
import { sendEmailVerification } from "firebase/auth";

const StudentDashboard = ({ teamId, currentUserEmail, userRole }) => {

    const currentUser = useAuth().currentUser;
    console.log(currentUser);
    return (
        <>
            <NavBar />
            <div className="flex flex-col">

                <div className="flex w-full items-center">
                    {teamId ? (
                        <div className="flex w-full justify-between">
                            <ProjectCard hasTeam={true} />
                            <ProgressBar teamId={teamId} />
                        </div>
                    ) : (
                        <div className="flex w-full justify-between">
                            <ProjectCard hasTeam={false} />
                            {/* <ProgressBar teamId={teamId} /> */}
                        </div>
                    )}
                </div>

                <div className="flex justify-center">
                    {
                        currentUser.emailVerified ? null : <div class="p-4 mb-4 text-sm text-red-600 rounded-lg bg-red-400 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p>An email has been sent to verify your account. To resend the email <button className="text-white" onClick={() => {
                                sendEmailVerification(currentUser);
                                alert('Email Resend. Check your email ✔');
                            }}>Click Here!</button></p>
                        </div>
                    }

                </div>


                <div className="flex flex-row justify-between">

                    <div className="flex">

                        <TeamReqBoard userRole={userRole} />
                        <NotificationBoard />
                    </div>
                    {teamId ? (
                        <Messaging
                            teamId={teamId}
                            currentUserEmail={currentUserEmail}
                        />
                    ) : null}
                </div>

            </div>
        </>
    );
};

export default StudentDashboard;
