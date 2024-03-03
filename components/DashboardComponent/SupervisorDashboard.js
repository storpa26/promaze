import React, { useState } from "react";
import NavBar from "../NavBar";
import CommitteeSidebar from "./CommitteeDashboard/CommitteeSidebar";
import NotificationBoard from "./Notification/NotificationBoard";
import TeamReqBoard from "./StudentDashboardComponent/TeamRequest/TeamReqBoard";
import TaskAssign from "./SupervisorDashboardComponent/TaskAssign/TaskAssign";
import { useAuth } from "../../context/AuthProvider";
import { sendEmailVerification } from "firebase/auth";

const SupervisorDashboard = ({ userRole, teamId }) => {
    const currentUser = useAuth().currentUser;

    return (
        <>
            <NavBar />
            <div>
                <div className="flex justify-between">
                    <div>
                        <CommitteeSidebar />
                    </div>
                    <div>
                        <TaskAssign />
                    </div>
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
                    <div className="flex ml-32">
                        <TeamReqBoard userRole={userRole} />
                        <NotificationBoard />
                    </div>
                    {/* <Messaging
                        teamId={teamId}
                        currentUserEmail={currentUserEmail}
                    /> */}
                </div>
            </div>
        </>
    );
};

export default SupervisorDashboard;
