import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../context/AuthProvider";
import StatusModal from "../Modals/StatusModal";
import { useRouter } from "next/router";

const HomePage = () => {
    const [modalStatus, setModalStatus] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const { login } = useAuth();

    const emailRef = useRef();
    const passRef = useRef();
    //form submit
    const handleFormSubmit = (event) => {
        event.preventDefault();

        const userEmail = emailRef.current.value;
        const userPassword = passRef.current.value;

        setModalStatus({
            status: "loading",
            message: "Setting up everything please wait",
        });
        setShowModal(true);

        try {
            login(userEmail, userPassword)
                .then(() => {
                    setModalStatus({
                        status: "success",
                        message: "You are logged in",
                        redirect: "/dashboard",
                    });
                })
                .catch((error) => {
                    setModalStatus({ status: "error", message: error.message });
                });
        } catch (error) {
            setModalStatus({ status: "error", message: error.message });
        }
    };
    return (
        <div>
            <div className="w-full h-20 flex flex-col content-center justify-center">

            </div>
            <div className="m-2 w-full flex justify-center font-semibold text-6xl text-websiteBlue">
                PROMAZE
            </div>
            <div className="m-2 w-full h-full italic items-center leading-10 font-normal text-xl text-center">
                is a cutting-edge project management platform that
                revolutionizes the way <br /> computer science students
                collaborate, work efficiently, stay organized and deliver <br />{" "}
                their projects.
            </div>
            <div className="flex mt-20">
                <div className="w-2/4 mt-32">
                    <form
                        onSubmit={handleFormSubmit}
                        className="flex flex-col items-center"
                    >
                        <div className="w-3/5 mb-6">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                E-mail
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="cse_2012020391@lus.ac.bd"
                                ref={emailRef}
                                required
                            />
                        </div>
                        <div className="w-3/5 mb-6">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                ref={passRef}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="text-white bg-websiteBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                    <div className="my-5 flex items-center justify-center">
                        <div className="text-center">
                            Don&apos;t have an account ?{" "}
                            <Link className="text-websiteBlue" href="/register">
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-2/4 flex justify-center">
                    <Image
                        src="/asset/Homepage/frontpage_svg.svg"
                        alt="frontpage_svg"
                        height={500}
                        width={700}
                    />
                </div>
            </div>
            {showModal ? (
                <StatusModal
                    modalStatus={modalStatus}
                    setShowModal={setShowModal}
                />
            ) : null}
        </div>
    );
};

export default HomePage;
