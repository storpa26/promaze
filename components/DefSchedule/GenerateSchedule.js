import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const GeneratedSchedule = ({ defenseSchedule, portals }) => {
    const [generatedProjects, setGeneratedProjects] = useState();

    // Sort by course code
    function sortByPriority(priority, projects) {
        let sortedProjects = [];

        priority.forEach((prio) => {
            let priorityWiseProjects = new Set();
            for (let i = 0; i < projects.length; i++) {
                if (prio === projects[i].enroledPortal.courseCode) {
                    priorityWiseProjects.add(projects[i]);
                }
            }
            sortedProjects.push(sortByStudnetId([...priorityWiseProjects]));
        });
        sortedProjects = sortedProjects.flat(1);
        for (let i = 0; i < defenseSchedule.length; i++) {
            if (sortedProjects.length - 1 < i) {
                break;
            } else {
                sortedProjects[i].date = defenseSchedule[i].date;
                sortedProjects[i].time = defenseSchedule[i].time;
            }
        }
        return sortedProjects;
    }
    // Sort by leader's studentId
    function sortByStudnetId(projects) {
        projects.sort(function (a, b) {
            return a.leader.studentId - b.leader.studentId;
        });
        return projects;
    }

    const handlePDFdownload = () => {
        window.print();
    };

    useEffect(() => {
        try {
            axios
                .get("http://localhost:3000/api/get-projects")
                .then((response) => {
                    // sort by leader's id
                    let projects = response.data;
                    let courseCodeArray = [];
                    portals.forEach((portal) => {
                        courseCodeArray.push(portal.courseCode);
                    });
                    let sortedByPriority = sortByPriority(
                        courseCodeArray,
                        projects
                    );
                    setGeneratedProjects(sortedByPriority);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Time
                            </th>
                            <th scope="col" className="px-6 py-3 row-span-3">
                                Student Email
                            </th>
                            <th scope="col" className="px-6 py-3 row-span-3">
                                Student Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Proposal URL
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Project Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Supervisor
                            </th>
                        </tr>
                    </thead>
                    {generatedProjects
                        ? generatedProjects.map((project) => (
                            <tbody key={project._id}>
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            {!project.date ||
                                                !project.time ? (
                                                <span>
                                                    Tumader defense dite hobe
                                                    na
                                                </span>
                                            ) : (
                                                <>
                                                    <span>
                                                        {project.date}
                                                    </span>

                                                    <span>
                                                        {project.time}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {project.leader.email}
                                        <br />
                                        {project.members[0]?.email}
                                        <br />
                                        {project.members[1]?.email}

                                    </td>
                                    <td className="px-6 py-4">
                                        {project.leader.name}
                                        <br />
                                        {project.members[0]?.name}
                                        <br />
                                        {project.members[1]?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {/* <Link href={project.proposalUrl}>PDF</Link> */}
                                        <a className="text-blue-400 font-bold" target="_blank" rel="noopener noreferrer" href={project.proposalUrl}>Proposal PDF</a>

                                    </td>
                                    <td className="px-6 py-4">
                                        {JSON.stringify(project.projectTitle)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {JSON.stringify(
                                            project.supervisorPreference[0]
                                                .name
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        ))
                        : null}
                </table>
                <button
                    type="submit"
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2"
                    onClick={handlePDFdownload}
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default GeneratedSchedule;
