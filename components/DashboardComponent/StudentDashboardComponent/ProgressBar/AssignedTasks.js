import React from "react";
import { handleTaskStatus } from "../../../../utils/clientAPI/sendRequest";

const AssignedTasks = ({ task, reRender, setRerender }) => {
    const handleTaskComplete = (event) => {
        const taskStatusObject = {
            taskId: event.target.id,
            taskStatus: event.target.checked,
        };

        try {
            handleTaskStatus(taskStatusObject)
                .then((response) => {
                    if (reRender) {
                        setRerender(false);
                    } else {
                        setRerender(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            alert(error);
        }
    };
    return (
        <div className="flex items-center space-x-2">
            <input
                name={task.taskTitle}
                id={task._id}
                onChange={handleTaskComplete}
                type="checkbox"
                value=""
                className="w-5 h-5 m-2 rounded-full text-green-600 bg-gray-300 border-gray-400 focus:ring-green-500 "
                checked={task.status}
            />
            <li>{task.title}</li>
        </div>
    );
};

export default AssignedTasks;
