import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { sendEmailVerification } from 'firebase/auth';
import firebase from 'firebase/app'
import { setNewUser } from "../../utils/clientAPI/sendRequest";
import StatusModal from "../Modals/StatusModal";

export default function StudentReg() {
    const [info, setInfo] = useState({});
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const { signUp } = useAuth();

    const [modalStatus, setModalStatus] = useState({});
    const [showModal, setShowModal] = useState(false);

    const [errors, setErrors] = useState({
        name: "",
        studentId: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    const handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        const newInfo = { ...info };
        newInfo[field] = value;
        newInfo.role = "student";
        setInfo(newInfo);
    };

    const handlePass = (event) => {
        const pass = event.target.value;
        setPass(pass);
    };
    const handleConfirmPass = (event) => {
        const pass = event.target.value;
        setConfirmPass(pass);
    };

    const validateEmail = (email) => {
        // const pattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/;
        const pattern = /^(cse|eee|law)_\d{10}@lus\.ac\.bd$/;
        return pattern.test(email);
    };

    const validatePassword = (password) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return pattern.test(password);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {
            name: "",
            studentId: "",
            email: "",
            password: "",
            confirmPassword: "",
        };

        if (!info.name) {
            newErrors.name = "Name is required.";
        }

        if (!info.studentId) {
            newErrors.studentId = "Student ID is required.";
        }

        if (!validateEmail(info.email)) {
            newErrors.email = "Invalid email address. Email should be provided by the Leading University.";
        }

        if (!validatePassword(pass)) {
            newErrors.password = "Password should contain at least 8 characters, including uppercase, lowercase, digits, and special characters.";
        }

        if (pass !== confirmPass) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        if (
            newErrors.name ||
            newErrors.studentId ||
            newErrors.email ||
            newErrors.password ||
            newErrors.confirmPassword
        ) {
            setErrors(newErrors);
            return;
        }

        setModalStatus({
            status: "loading",
            message: "Setting up everything, please wait...",
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
            setModalStatus({ status: "error", message: error.message });
        }

    };
    return (
        <div className="w-full m-10">
            <form onSubmit={handleFormSubmit} className="w-full">
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
                            required
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="studentId"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Student ID
                        </label>
                        <input
                            onChange={handleChange}
                            type="tel"
                            name="studentId"
                            id="studentId"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="2012020391"
                            required
                        />
                        {errors.studentId && <p className="text-red-500">{errors.studentId}</p>}
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
                            placeholder="cse_2012020391@lus.ac.bd"
                            required
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Password
                    </label>
                    <input
                        onChange={handleConfirmPass}
                        type="password"
                        name="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="•••••••••"
                        required
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="confirm_password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Confirm password
                    </label>
                    <input
                        onChange={handlePass}
                        type="password"
                        name="confirmPassword"
                        id="confirm_password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="•••••••••"
                        required
                    />
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300"
                            required
                        />
                    </div>
                    <label
                        htmlFor="remember"
                        className="ml-2 text-sm font-medium text-gray-900"
                    >
                        I agree with the{" "}
                        <a href="#" className="text-blue-600 hover:underline">
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
            {showModal && (
                <StatusModal
                    modalStatus={modalStatus}
                    setShowModal={setShowModal}
                />
            )}
        </div>
    );
}
