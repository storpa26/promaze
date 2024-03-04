import React, { useState } from "react";
import SearchBar from "../../components/StudentList/SearchBar";
import { connectToDatabase } from "../../lib/mongodb";
import NavBar from "../../components/NavBar";
import EachSupervisor from "../../components/SupervisorList/EachSupervisor";

const SupervisorListPage = ({ allSupervisors }) => {
    const [query, setQuery] = useState("");
    const searchSupervisor = (supervisor) => {
        if (query.toLowerCase() === "") {
            return supervisor;
        } else {
            let filterByName = supervisor.name
                .toLowerCase()
                .includes(query.toLowerCase());
            return filterByName;
        }
    };

    return (
        <div>
            <NavBar />
            <SearchBar setQuery={setQuery} />
            <div className="w-full overflow-x-auto shadow-md sm:rounded-lg ">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-lg text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                ID
                            </th>
                            {/* <th scope="col" className="px-6 py-3 text-center">
                                Batch
                            </th> */}
                            {/* <th scope="col" className="px-6 py-3 text-center">
                                Section
                            </th> */}
                        </tr>
                    </thead>
                    {allSupervisors
                        .filter((supervisor) => {
                            return searchSupervisor(supervisor);
                        })
                        .map((supervisor) => (
                            <EachSupervisor key={supervisor._id} supervisor={supervisor} />
                        ))}
                </table>
            </div>
        </div>
    );
};

export default SupervisorListPage;

export async function getServerSideProps() {
    const { db } = await connectToDatabase();
    const userCollection = await db.collection("users");
    let allSupervisors = await userCollection.find({ role: "teacher" }).toArray();
    if (allSupervisors !== null) {
        allSupervisors = JSON.stringify(allSupervisors);
    }

    return {
        props: {
            allSupervisors: JSON.parse(allSupervisors),
        },
    };
}
