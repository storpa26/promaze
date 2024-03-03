import React, { useState } from "react";
import SearchBar from "../../components/StudentList/SearchBar";
import EachStudent from "../../components/StudentList/EachStudent";
import { connectToDatabase } from "../../lib/mongodb";
import NavBar from "../../components/NavBar";

const StudentListPage = ({ allStudents }) => {
    const [query, setQuery] = useState("");
    const searchStudents = (student) => {
        if (query.toLowerCase() === "") {
            return student;
        } else {
            let filterByName = student.name
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
                            <th scope="col" className="px-6 py-3 text-center">
                                Batch
                            </th>
                            {/* <th scope="col" className="px-6 py-3 text-center">
                                Section
                            </th> */}
                        </tr>
                    </thead>
                    {allStudents
                        .filter((student) => {
                            return searchStudents(student);
                        })
                        .map((student) => (
                            <EachStudent key={student._id} student={student} />
                        ))}
                </table>
            </div>
        </div>
    );
};

export default StudentListPage;

export async function getServerSideProps() {
    const { db } = await connectToDatabase();
    const userCollection = await db.collection("users");
    let allStudents = await userCollection.find({ role: "student" }).toArray();
    if (allStudents !== null) {
        allStudents = JSON.stringify(allStudents);
    }

    return {
        props: {
            allStudents: JSON.parse(allStudents),
        },
    };
}
