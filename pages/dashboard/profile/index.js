import Image from "next/image";
import React, { useState, useEffect } from "react";
import avatar from "../../../public/asset/Shared/avatar.svg";
import axios from "axios";
import UserInfo from "../../../components/UserProfile/UserInfo";
import { useAuth } from "../../../context/AuthProvider";
import NavBar from "../../../components/NavBar";

export default function UserProfile() {
    const [currentUser, setCurrentUser] = useState();
    const currentUserEmail = useAuth().currentUser.email;
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/get-users", {
                params: { currentUserEmail: currentUserEmail },
            })
            .then((response) => {
                setCurrentUser(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [currentUserEmail]);

    return (
        <div className="container m-auto">
            <NavBar />

            <div>
                <div className="bg-gradient-to-r from-websiteBlue to-purple-600 h-72 w-auto m-auto mt-10 rounded-lg"></div>
                <div className="container flex space-x-20">
                    <div className="h-80 w-72 bg-white rounded-lg -mt-20 ml-16">
                        <div>
                            <Image
                                className="m-auto"
                                src={avatar}
                                alt="User-Photo"
                            />
                        </div>
                        {currentUser ? (
                            <div className="text-center">
                                <h1 className="font-bold text-lg">
                                    {currentUser.name}
                                </h1>
                                <h6 className="text-gray-700 text-sm">
                                    {currentUser.studentId}
                                </h6>
                            </div>
                        ) : null}
                    </div>
                    <div className="w-full mt-10">
                        {currentUser ? (
                            <UserInfo currentUser={currentUser} />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
