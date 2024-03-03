import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EachRequest from "./EachRequest";
import { useAuth } from "../../../../context/AuthProvider";

export default function TeamReqBoard({ userRole }) {
    const currentUserEmail = useAuth().currentUser.email;
    const currentUserName = useAuth().currentUser.displayName;
    const [teamRequest, setTeamRequest] = useState();
    const [reRenderRequest, setReRenderRequest] = useState();
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/get-requests", {
                params: { currentUserEmail: currentUserEmail },
            })
            .then((response) => {
                setTeamRequest(response.data);
            });
    }, [currentUserEmail, reRenderRequest]);
    return (
        <div className="m-5 w-96 h-fit border-2 border-slate-200 rounded-lg">
            <div className="my-2 block px-4 py-2 font-semibold text-2xl text-center text-websiteBlue rounded-t-lg bg-gray-50 shadow-md">
                Invitations
            </div>

            <div className="h-96 divide-y divide-gray-100 overflow-y-auto">
                {teamRequest
                    ? teamRequest.map((request) => (
                          <EachRequest
                              key={request.teamId}
                              projectInfo={{
                                  currentUserEmail: currentUserEmail,
                                  currentUserName: currentUserName,
                                  ...request,
                                  userRole: userRole,
                              }}
                              setReRenderRequest={setReRenderRequest}
                              reRenderRequest={reRenderRequest}
                              userRole={userRole}
                          />
                      ))
                    : null}
            </div>
        </div>
    );
}
