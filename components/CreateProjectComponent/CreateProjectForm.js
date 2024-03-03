import React, { useState } from "react";
import { addProject } from "../../utils/clientAPI/sendRequest";
import StatusModal from "../Modals/StatusModal";
import DropdownCheckbox from "./DropdownCheckbox";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../lib/firebase";
import SelectPortalCheckbox from "./SelectPortalCheckbox";

const CreateProjectForm = ({ currentUserEmail }) => {
    const [modalStatus, setModalStatus] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [teammate, setTeammate] = useState([]);
    const [supervisor, setSupervisor] = useState([]);
    const [portal, setPortal] = useState();
    const [project, setProject] = useState([]);
    const [leaderInfo, setLeaderInfo] = useState();
    const [uploadedPdf, setuploadedPdf] = useState(null);

    const handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        const newProject = {
            ...project,
        };
        newProject[field] = value;
        setProject(newProject);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        let teammateArray = [];
        teammate.forEach((student) => {
            teammateArray.push({
                email: student.email,
                name: student.displayName,
            });
        });
        let supervisorArray = [];
        supervisor.forEach((teacher) => {
            supervisorArray.push({
                email: teacher.email,
                name: teacher.displayName,
            });
        });

        const projectInfo = {
            enroledPortal: {
                courseTitle: portal[0].displayName,
                courseCode: portal[0].courseCode,
                portalId: portal[0].portalId,
            },
            leader: { ...leaderInfo, email: currentUserEmail },
            ...project,
            teamId:
                currentUserEmail.match(/^[^@]+/)[0] +
                "-" +
                project.projectTitle.toLowerCase().replace(/ /g, "-"),
            teammateRequest: teammateArray,
            supervisorPreference: supervisorArray,
        };

        // file upload handling
        const storageRef = ref(
            storage,
            `proposal/${projectInfo.teamId}-proposal`
        );

        setModalStatus({
            status: "loading",
            message: "Setting up everything please wait",
        });
        setShowModal(true);

        try {
            uploadBytes(storageRef, uploadedPdf)
                .then((snapshot) => {
                    getDownloadURL(storageRef)
                        .then((url) => {
                            projectInfo.proposalUrl = url;
                            // Add project function is called after the URL is obtained
                            addProject(projectInfo)
                                .then((newProjectStatus) => {
                                    if (newProjectStatus.status === 200) {
                                        setModalStatus({
                                            status: "success",
                                            message:
                                                "Project added successfully",

                                            // redirect: "/dashboard",
                                        });
                                    } else {
                                        setModalStatus({
                                            status: "error",
                                            message: newProjectStatus.message,
                                        });
                                    }
                                })
                                .catch((error) => {
                                    setModalStatus({
                                        status: "error",
                                        message: error.message,
                                    });
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            setModalStatus({ status: "error", message: error.message });
        }
    };

    return (
        <div className="w-4/5 my-10">
            <form onSubmit={handleFormSubmit}>
                <div className="mb-6">
                    <label
                        name="proposal"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Select Portal
                    </label>

                    <SelectPortalCheckbox setPortal={setPortal} required />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Project Title
                    </label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="projectTitle"
                        className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Project Description
                    </label>
                    <textarea
                        name="description"
                        rows="4"
                        onChange={handleChange}
                        type="text"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Upload Proposal
                    </label>
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    aria-hidden="true"
                                    className="w-10 h-10 mb-3 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    ></path>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">
                                        Click to upload
                                    </span>{" "}
                                    or drag and drop
                                </p>
                                <p className="text-xs text-center text-gray-500">
                                    Upload you project proposal <br /> PDF Only
                                </p>
                            </div>
                            <input
                                onChange={(event) => {
                                    setuploadedPdf(event.target.files[0]);
                                }}
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                required
                            />
                        </label>
                    </div>
                </div>

                <div className="mb-6">
                    <label
                        name="proposal"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Preferred Supervisor
                    </label>

                    <DropdownCheckbox
                        setTeammate={setTeammate}
                        searchFor={"supervisor"}
                        setSupervisor={setSupervisor}
                        currentUserEmail={currentUserEmail}
                        setLeaderInfo={setLeaderInfo}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        name="proposal"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Request Teammate
                    </label>

                    <DropdownCheckbox
                        setTeammate={setTeammate}
                        searchFor={"teammate"}
                        setSupervisor={setSupervisor}
                        currentUserEmail={currentUserEmail}
                        setLeaderInfo={setLeaderInfo}
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2"
                    >
                        Submit
                    </button>
                </div>
            </form>
            {showModal ? (
                <StatusModal
                    modalStatus={modalStatus}
                    setShowModal={setShowModal}
                />
            ) : null}
        </div>
    );
};

export default CreateProjectForm;
