import Multiselect from "multiselect-react-dropdown";
import React, { useState } from "react";
import SelectPortalCheckbox from "../CreateProjectComponent/SelectPortalCheckbox";
import GeneratedSchedule from "./GenerateSchedule";
import TimeSlot from "./TimeSlot";

export default function DefSchedule() {
    const [defenseDate, setDefenseDate] = useState([]);
    const [timeSlot, setTimeSlot] = useState([]);
    const [defenseSchedule, setDefenseSchedule] = useState();
    const [portals, setPortals] = useState();

    const handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        const newDate = { ...defenseDate };
        newDate[field] = value;
        setDefenseDate(newDate);
    };

    function getNumberOfDays(from, to) {
        // Calculate the difference in milliseconds
        const diffInMs = to - from;

        // Convert milliseconds to days
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        if (diffInDays < 0) {
            alert("Date can not be negative ❌");
        } else {
            return diffInDays + 1;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let totalNumberOfDays = getNumberOfDays(
            new Date(defenseDate.startDate),
            new Date(defenseDate.endDate)
        );
        timeSlot.sort(function (a, b) {
            const aStartTime = parseInt(a.split(" - ")[0].replace(":", ""));
            const bStartTime = parseInt(b.split(" - ")[0].replace(":", ""));

            return aStartTime - bStartTime;
        });

        let defenseScheduleArray = [];
        for (let i = 0; i < totalNumberOfDays; i++) {
            timeSlot.forEach((slot) => {
                let dateObj = new Date(defenseDate.startDate); // convert date string to date object
                dateObj.setDate(dateObj.getDate() + i); // increment date by one day
                dateObj = dateObj.toISOString().split("T")[0]; // convert date object back to string

                defenseScheduleArray.push({
                    date: dateObj,
                    time: slot,
                });
            });
        }
        setDefenseSchedule(defenseScheduleArray);
    };

    return (
        <div>
            {!defenseSchedule ? (
                <form onSubmit={handleSubmit}>
                    <div className="mt-2 bg-white rounded-lg p-5">
                        <h1 className="text-5xl text-center">
                            Generate Defense Schedule
                        </h1>
                        <div className="w-full">
                            <div>
                                <label
                                    htmlFor="small-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Select Course
                                </label>
                                <SelectPortalCheckbox
                                    select="multiselect"
                                    setPortal={setPortals}
                                />
                            </div>

                            <div className="mt-2 flex items-center">
                                <label
                                    htmlFor="small-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Time Slots
                                </label>
                                <TimeSlot
                                    timeSlot={timeSlot}
                                    setTimeSlot={setTimeSlot}
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    htmlFor="small-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Date
                                </label>

                                {/* <div date-rangepicker className="flex items-center">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                </div>
                                <input name="start" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" />
                            </div>
                            <span className="mx-4 text-gray-500">to</span>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                </div>
                                <input name="end" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end" />
                            </div>
                        </div> */}

                                <input
                                    onChange={handleChange}
                                    name="startDate"
                                    type="date"
                                />
                                <label className="mx-5">To</label>
                                <input
                                    onChange={handleChange}
                                    name="endDate"
                                    type="date"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            ) : (
                <GeneratedSchedule
                    defenseSchedule={defenseSchedule}
                    portals={portals}
                />
            )}
        </div>
    );
}
