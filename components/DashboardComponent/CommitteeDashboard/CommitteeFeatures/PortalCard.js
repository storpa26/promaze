import React from "react";
import { AiOutlineProject } from "react-icons/Ai";
import { AiOutlineFileAdd } from "react-icons/Ai";
import { handlePortalStatus } from "../../../../utils/clientAPI/sendRequest";

export default function PortalCard({ portals, reRender, setRerender }) {
    const handlePortalSwitch = (event) => {
        const portalStatusObject = {
            taskId: event.target.id,
            taskStatus: event.target.checked,
            courseCode: event.target.value,
        };

        try {
            handlePortalStatus(portalStatusObject)
                .then((response) => {
                    if (reRender) {
                        setRerender(false);
                    } else {
                        setRerender(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            alert(error);
        }
    };
    return (
        <>
            {portals
                ? portals.map((portal) => (
                    <div
                        className="bg-white rounded-lg"
                        key={portal._id}
                    >
                        <div className="m-5 block h-24 max-w-sm p-6 bg-teal-700 border-gray-200 rounded-lg shadow">
                            <div className="flex justify-between">
                                <div className="mb-2 text-xl font-semibold tracking-tight text-white">
                                    {portal.courseCode}
                                </div>
                                {/* should be next-link */}
                                <div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            onChange={handlePortalSwitch}
                                            id={portal._id}
                                            type="checkbox"
                                            value={portal.courseCode}
                                            className="sr-only peer"
                                            checked={portal.status}
                                        />
                                        <div className="w-11 h-6 bg-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
                                        {/* <span className="ml-3 text-sm font-medium text-gray-900">
                                            Turn On
                                        </span> */}
                                    </label>
                                </div>
                            </div>
                            <div className="flex font-normal text-white">
                                <AiOutlineProject
                                    size={20}
                                    className="mr-2"
                                />{" "}
                                {portal.courseTitle}

                            </div>
                            {/* <div className="my-3 text-white">
                                <div>
                                    Name:{" "}
                                    <span className="italic">
                                        {portal.courseTitle}
                                    </span>
                                </div>
                                <div>
                                    Description:{" "}
                                    <span className="italic">
                                        {portal.courseDescription}
                                    </span>
                                </div>
                            </div> */}
                        </div>
                        {/* <div className="flex justify-center items-center">
                            <button>
                                <AiOutlineFileAdd size={40} />
                            </button>
                        </div> */}
                    </div>
                ))
                : null}
        </>
    );
}
