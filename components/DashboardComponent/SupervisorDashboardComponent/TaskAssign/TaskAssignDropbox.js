import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthProvider";

const TaskAssignDropbox = ({ setSelectedTeam }) => {
    const [myTeams, setMyTeams] = useState();
    const currentUserEmail = useAuth().currentUser.email;
    useEffect(() => {
        let myTeamInfo = [];
        try {
            axios
                .get("http://localhost:3000/api/get-projects", {
                    params: { currentUserEmail: currentUserEmail },
                })
                .then((response) => {
                    response.data.map((team) => {
                        let eachTeamInfo = {
                            displayName: team.projectTitle,
                            teamId: team.teamId,
                        };
                        myTeamInfo.push(eachTeamInfo);
                    });
                    setMyTeams(myTeamInfo);
                });
        } catch (error) {
            console.log(error);
        }
    }, [currentUserEmail, myTeams]);

    return (
        <div>
            <Multiselect
                displayValue="displayName"
                placeholder="search by team name"
                onRemove={(event) => {
                    setSelectedTeam(event);
                }}
                onSelect={(event) => {
                    setSelectedTeam(event);
                }}
                options={myTeams}
                style={{
                    searchBox: {
                        borderRadius: "0.5rem",
                    },
                }}
                singleSelect
            />
        </div>
    );
};

export default TaskAssignDropbox;
