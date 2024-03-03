import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";

const DropdownCheckbox = ({
    setTeammate,
    setSupervisor,
    searchFor,
    currentUserEmail,
    setLeaderInfo,
}) => {
    const [allStudents, setAllStudents] = useState();
    const [allSupervisor, setAllSupervisor] = useState();

    useEffect(() => {
        const allStudentInfo = [];
        const allSupervisorInfo = [];
        axios.get("http://localhost:3000/api/get-users").then((response) => {
            response.data.map((user) => {
                if (
                    user.role === "student" &&
                    user.email !== currentUserEmail
                ) {
                    let student = {
                        displayName: `${user.name} (${user.studentId})`,
                        email: user.email,
                    };
                    allStudentInfo.push(student);
                } else if (user.role === "teacher") {
                    let teacher = {
                        displayName: user.name,
                        email: user.email,
                    };
                    allSupervisorInfo.push(teacher);
                }
                if (user.email === currentUserEmail) {
                    const leaderInfo = {
                        name: user.name,
                        studentId: user.studentId,
                    };
                    setLeaderInfo(leaderInfo);
                }
            });
            setAllStudents(allStudentInfo);
            setAllSupervisor(allSupervisorInfo);
        });
    }, [currentUserEmail, setLeaderInfo]);

    return (
        <div>
            {searchFor === "teammate" ? (
                <Multiselect
                    displayValue="displayName"
                    placeholder="search by student id"
                    onRemove={(event) => {
                        setTeammate(event);
                    }}
                    onSelect={(event) => {
                        setTeammate(event);

                        console.log(event);
                    }}
                    options={allStudents}
                    showCheckbox={true}
                    style={{
                        searchBox: {
                            borderRadius: "0.5rem",
                        },
                    }}
                />
            ) : (
                <Multiselect
                    displayValue="displayName"
                    placeholder="search by teacher name"
                    onRemove={(event) => {
                        setSupervisor(event);
                    }}
                    onSelect={(event) => {
                        setSupervisor(event);
                    }}
                    options={allSupervisor}
                    showCheckbox={true}
                    style={{
                        searchBox: {
                            borderRadius: "0.5rem",
                        },
                    }}
                />
            )}
        </div>
    );
};

export default DropdownCheckbox;
