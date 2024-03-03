import Image from "next/image";
import React, { useState } from "react";
import StudentReg from "../../components/AuthForm/StudentReg";
import TeacherReg from "../../components/AuthForm/TeacherReg";
export default function RegisterPage() {
    const [viewForm, setViewForm] = useState("student");
    return (
        <div>
            <div className="w-full h-20 flex flex-col content-center justify-center">
                LOGO
            </div>
            <div className="flex flex-col items-center justify-center w-full flex-1">
                <div>
                    <div className="m-2 w-full flex justify-center font-semibold text-6xl text-websiteBlue">
                        Create An Account
                    </div>
                    <div className="mb-10 font-bold text-center text-2xl">
                        as
                    </div>
                </div>
                <div className="w-1/3 flex mt-4 justify-around">
                    <button
                        className={`text-white rounded-md border-solid border-2 lg:px-10 md:px-10 sm:px-2 py-2 ${
                            viewForm === "student"
                                ? "bg-blue-600"
                                : "border-sky-400 text-black"
                        }`}
                        onClick={() => setViewForm("student")}
                    >
                        Student
                    </button>
                    <button
                        className={`text-white rounded-md border-solid border-2 lg:px-10 md:px-10 sm:px-2 py-2 ${
                            viewForm === "teacher"
                                ? "bg-blue-600"
                                : "border-sky-400 text-black"
                        }`}
                        onClick={() => setViewForm("teacher")}
                    >
                        Teacher
                    </button>
                </div>
                <div className="w-full flex justify-between">
                    <div className="flex flex-col items-center justify-end">
                        <Image
                            src="/asset/RegistrationPage/Student SVG.svg"
                            alt=""
                            height={200}
                            width={400}
                        />
                    </div>
                    <div className="w-auto">
                        {viewForm === "student" ? (
                            <StudentReg />
                        ) : (
                            <TeacherReg />
                        )}
                    </div>
                    <div>
                        <Image
                            src="/asset/RegistrationPage/Teacher SVG.svg"
                            alt=""
                            height={300}
                            width={500}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
