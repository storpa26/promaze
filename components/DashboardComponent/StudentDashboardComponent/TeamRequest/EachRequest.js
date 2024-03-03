import React, { useState } from "react";
import Image from "next/image";
import avatar from "../../../../public/asset/Shared/avatar.svg";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
    removeRequest,
    acceptRequest,
} from "../../../../utils/clientAPI/sendRequest";

const EachRequest = ({
    projectInfo,
    setReRenderRequest,
    reRenderRequest,
    userRole,
}) => {
    // const [toastMessage, setToastMessage] = useState();
    const [loading, setLoading] = useState(false);
    const handleAccept = async () => {
        setLoading(true);
        try {
            await acceptRequest(projectInfo, toast).then((res) => {
                if (reRenderRequest === true) {
                    setReRenderRequest(false);
                } else {
                    setReRenderRequest(true);
                }
            });
        } catch (error) {
            alert(error);
        }
        setLoading(false);
    };

    const handleReject = async () => {
        setLoading(true);
        try {
            await removeRequest(projectInfo).then((res) => {
                if (reRenderRequest === true) {
                    setReRenderRequest(false);
                } else {
                    setReRenderRequest(true);
                }
            });
        } catch (error) {
            alert(error);
        }
        setLoading(false);
    };
    return (
        <div
            className={`flex px-4 py-3 hover:bg-gray-200 ${
                loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
        >
            <div className="flex-shrink-0">
                <Image
                    className="rounded-full w-11 h-11"
                    src={avatar}
                    alt="avatar"
                />
                <div className="relative flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-gray-900 border border-white rounded-full">
                    {/* <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg> */}
                    <Image
                        className="rounded-full w-3 h-3"
                        src={avatar}
                        alt="avatar"
                    />
                </div>
            </div>
            <div className="w-full pl-3">
                <div className="text-gray-500 text-sm mb-1.5">
                    <span className="font-semibold text-gray-900">
                        {projectInfo.teamLeader.name +
                            " " +
                            `(${projectInfo.teamLeader.studentId})`}{" "}
                    </span>
                    {userRole === "teacher" ? (
                        <span>
                            has prefered you to be his supervisor in his project{" "}
                        </span>
                    ) : (
                        <span>has invited you to join his project </span>
                    )}
                    <span className="font-semibold text-gray-900">
                        {projectInfo.projectTitle}
                    </span>
                </div>

                <div className="flex float-right">
                    <div className="mr-2">
                        <button onClick={handleAccept}>
                            <ToastContainer />
                            <BsCheckCircleFill
                                className="text-green-500"
                                size={24}
                            />
                        </button>
                    </div>

                    {/* <div id="toast-default" aria-hidden='true' class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Fire icon</span>
                        </div>
                        <div class="ml-3 text-sm font-normal">Set yourself free.</div>
                        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
                            <span class="sr-only">Close</span>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div> */}

                    <div className="ml-2">
                        <button onClick={handleReject}>
                            <BsXCircleFill className="text-red-500" size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EachRequest;
