import axios from "axios";
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AssignedTasks from "./AssignedTasks";

export default function ProgressBar({ teamId }) {
    const [allTasks, setAllTasks] = useState();
    const [reRender, setRerender] = useState(false);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/get-tasks", {
                params: { teamId: teamId },
            })
            .then((response) => {
                const taskData = response.data;
                let completedTask = 0;
                taskData.forEach((task) => {
                    if (task.status) {
                        completedTask++;
                    }
                });

                let progress = Math.floor(
                    (completedTask / taskData.length) * 100
                );
                if (progress === Number) {
                    setPercentage(progress);
                } else {
                    setPercentage(0);
                }

                setAllTasks(response.data);
            });
    }, [teamId, reRender]);
    return (
        <div className="m-5 block w-96 max-w-sm">
            <div className="bg-websiteBlue p-3 border-2 border-gray-200 rounded-xl">
                <div className="flex justify-between">
                    <div>
                        <h1 className="font-bold text-2xl text-white">
                            Total Progress
                        </h1>
                        <h4 className="text-gray-200 text-sm p-1">
                            Your Total Project Progress
                        </h4>
                    </div>
                    <div className="w-20 h-20">
                        <CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            styles={buildStyles({
                                textSize: "24px",
                                pathColor: `rgb(255,255,255)`,
                                textColor: "white",
                                trailColor: "#002AAA",
                            })}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-5 h-fit block w-96 max-w-sm p-6 border-2 border-slate-200 rounded-lg">
                <div className="mb-2 font-semibold text-xl text-websiteBlue">
                    Tasks:
                </div>
                <ul className="h-32 overflow-y-auto">
                    {allTasks
                        ? allTasks.map((task) => (
                              <AssignedTasks
                                  key={task._id}
                                  task={task}
                                  reRender={reRender}
                                  setRerender={setRerender}
                              />
                          ))
                        : null}
                </ul>
            </div>
        </div>
    );
}
