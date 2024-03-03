import React, { useState } from "react";
import { AiOutlineProject } from "react-icons/Ai";
import { AiOutlineFileAdd } from "react-icons/Ai";
import { AiFillEdit } from "react-icons/Ai";
import avatar from "../../../public/asset/Shared/avatar.svg";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ hasTeam }) => {
    const [addProjectCard, setAddProjectCard] = useState(true);
    return (
        <div>
            {hasTeam ? (
                <div className="m-5 block w-96 max-w-sm p-6 bg-websiteBlue border-gray-200 rounded-lg shadow">
                    <div className="flex justify-between">
                        <div className="mb-2 text-2xl font-semibold tracking-tight text-white">
                            CSE-3300
                        </div>
                        {/* should be next-link */}
                        <a className="text-white hover:scale-110" href="###">
                            <AiFillEdit size={20} className="mr-2" />
                        </a>
                    </div>
                    <div className="flex font-normal text-white">
                        <AiOutlineProject size={20} className="mr-2" /> 3rd Year
                        Project
                    </div>
                    <div className="my-3 text-white">
                        <div>
                            Name: <span className="italic">Project Name</span>
                        </div>
                        <div>
                            Description:{" "}
                            <span className="italic">
                                ajaira project description
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-around">
                        <div className="w-1/2">
                            <div className="flex justify-center text-white">
                                Team
                            </div>
                            <div className="w-full flex justify-around">
                                <Image
                                    src={avatar}
                                    alt=""
                                    height={30}
                                    width={30}
                                />
                                <Image
                                    src={avatar}
                                    alt=""
                                    height={30}
                                    width={30}
                                />
                                <Image
                                    src={avatar}
                                    alt=""
                                    height={30}
                                    width={30}
                                />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="flex justify-center text-white">
                                Supervisor
                            </div>
                            <div className="w-full flex justify-center">
                                <Image
                                    src={avatar}
                                    alt=""
                                    height={30}
                                    width={30}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link
                    href="/dashboard/create-project"
                    className="m-5 block w-96 max-w-sm p-6 bg-websiteBlue border-gray-200 rounded-lg shadow"
                >
                    <div className="mb-2 text-2xl font-semibold tracking-tight text-white">
                        CSE-3300
                    </div>
                    <div className="flex font-normal text-white">
                        <AiOutlineProject size={20} className="mr-2" /> 3rd Year
                        Project
                    </div>
                    <div className="mt-3 text-white">
                        <div className="flex justify-center items-center">
                            <AiOutlineFileAdd size={40} />
                        </div>
                        <div className="flex justify-center items-center">
                            Add a Project
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default ProjectCard;
