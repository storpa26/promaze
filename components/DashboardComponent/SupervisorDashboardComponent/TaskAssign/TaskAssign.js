import React, { useState } from "react";
import { assignNewTask } from "../../../../utils/clientAPI/sendRequest";
import StatusModal from "../../../Modals/StatusModal";
import { FaTasks } from "react-icons/fa";
import TaskAssignDropbox from "./TaskAssignDropbox";

const TaskAssign = ({ teamId }) => {
    const [modalStatus, setModalStatus] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState();
    const [tasks, setTasks] = useState([]);

    const handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        const newTask = { ...tasks };
        newTask[field] = value;
        setTasks(newTask);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        setModalStatus({
            status: "loading",
            message: "Setting up everything please wait",
        });
        setShowModal(true);

        try {
            const newTaskStatus = await assignNewTask({
                teamId: selectedTeam[0].teamId,
                ...tasks,
            });
            if (newTaskStatus.status === 200) {
                setModalStatus({
                    status: "success",
                    message: "Task added successfully",
                });
            } else {
                setModalStatus({
                    status: "error",
                    message: newTaskStatus.message,
                });
            }
        } catch (error) {
            setModalStatus({ status: "error", message: error.message });
        }
    };

    return (
        <div className="m-5 p-2 w-96 h-fit border-2 border-slate-200 rounded-lg">
            <div className="m-2 justify-center gap-x-2 px-4 py-2 font-semibold text-2xl text-center rounded-t-lgshadow-md">
                <div className="text-teal-500">

                    <FaTasks />
                </div>
                <div>
                    <p className="text-gray-500">Assign Task</p>
                </div>
            </div>

            <form onSubmit={handleFormSubmit}>
                <div className="mb-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">
                            Task Title
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="title"
                            className="block w-full p-2 text-gray-900 border border-gray-400 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
                        />
                    </div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Task Description
                    </label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="description"
                        className="block w-full p-4 text-gray-900 border border-gray-400 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 "
                    />
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Select Team
                </label>
                <TaskAssignDropbox setSelectedTeam={setSelectedTeam} />
                <button
                    type="submit"
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2"
                >
                    Assign
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
};

export default TaskAssign;
