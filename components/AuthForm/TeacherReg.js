import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { setNewUser } from "../../utils/clientAPI/sendRequest";
import StatusModal from "../Modals/StatusModal";

export default function TeacherReg() {
    const [info, setInfo] = useState([]);
    const [pass, setPass] = useState("");
    const { signUp } = useAuth();

    const [modalStatus, setModalStatus] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        const newInfo = { ...info };
        newInfo[field] = value;
        newInfo.role = "teacher";
        setInfo(newInfo);
    };

    const handlePass = (event) => {
        const pass = event.target.value;
        setPass(pass);
    };

    //form submit
    const handleFormSubmit = (event) => {
        event.preventDefault();
        setModalStatus({
            status: "loading",
            message: "Setting up everything please wait",
        });
        setShowModal(true);
        try {
            signUp(info.email, pass, info.name)
                .then(async () => {
                    const newUserStatus = await setNewUser(info);
                    if (newUserStatus.status === 200) {
                        setModalStatus({
                            status: "success",
                            message: "User added successfully",
                            redirect: "/dashboard",
                        });
                    } else {
                        setModalStatus({
                            status: "error",
                            message: newUserStatus.message,
                        });
                    }
                })
                .catch((error) => {
                    setModalStatus({ status: "error", message: error.message });
                });
        } catch (error) {
            alert("something went wrong !!!");
            setModalStatus({ status: "error", message: error.message });
        }
    };

    return (
        <div className="w-full m-10">
            <form onSubmit={handleFormSubmit}>
                <div className="mb-6">
                    <div>
                        <label
                            htmlFor="first_name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Name
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="name"
                            id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Your Name"
                            required=""
                        />
                    </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="teacherId"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            Teacher ID
                        </label>
                        <input
                            onChange={handleChange}
                            type="tel"
                            name="teacherId"
                            id="teacherId"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="2012020391"
                            required=""
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Email address
                        </label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="mony_cse@lus.ac.bd"
                            required=""
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5      "
                        placeholder="•••••••••"
                        required=""
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="confirm_password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Confirm password
                    </label>
                    <input
                        onChange={handlePass}
                        type="password"
                        name="password"
                        id="confirm_password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="•••••••••"
                        required=""
                    />
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300"
                            required="true"
                        />
                    </div>
                    <label
                        htmlFor="remember"
                        className="ml-2 text-sm font-medium text-gray-900"
                    >
                        I agree with the{" "}
                        <a required href="#" className="text-blue-600 hover:underline">
                            terms and conditions
                        </a>
                        .
                    </label>
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                    Submit
                </button>
            </form>
            {showModal ? (
                <StatusModal
                    modalStatus={modalStatus}
                    setShowModal={setShowModal}
                />
            ) : null}
        </div>
    );
}
