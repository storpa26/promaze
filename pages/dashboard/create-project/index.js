import Image from "next/image";
import React, { useState } from "react";
import CreateProjectForm from "../../../components/CreateProjectComponent/CreateProjectForm";
import NavBar from "../../../components/NavBar";
import { useAuth } from "../../../context/AuthProvider";

export default function CreateTeam() {
    const currentUserEmail = useAuth().currentUser.email;

    return (
        <div>
            <NavBar />
            <div className="m-2 w-full flex justify-center font-semibold text-6xl text-websiteBlue">
                Create A Project
            </div>
            <div className="flex">
                <div className="w-1/2 flex justify-center">
                    <CreateProjectForm currentUserEmail={currentUserEmail} />
                </div>
                <div className="w-1/2 flex justify-end">
                    <Image
                        src="/asset/CreateProject/create_project.svg"
                        alt=""
                        height={200}
                        width={600}
                    />
                </div>
            </div>
        </div>
    );
}
