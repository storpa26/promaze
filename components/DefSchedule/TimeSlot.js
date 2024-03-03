import React, { useState } from "react";

export default function TimeSlot({ timeSlot, setTimeSlot }) {
    const handleChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setTimeSlot([...timeSlot, value]);
        }
    };
    return (
        <div>
            <div className="z-10 bg-white rounded-lg shadow w-96 dark:bg-gray-700 ml-2">
                <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
                    <li>
                        <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input
                                onChange={handleChange}
                                id="checkbox-item-11"
                                type="checkbox"
                                value="9:30 - 10:30"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="checkbox-item-11"
                                className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                                9:30 - 10:00
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input
                                onChange={handleChange}
                                id="checkbox-item-12"
                                type="checkbox"
                                value="10:30 - 11:00"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="checkbox-item-12"
                                className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                                10:30 - 11:00
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input
                                onChange={handleChange}
                                id="checkbox-item-13"
                                type="checkbox"
                                value="11:00 - 11:30"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="checkbox-item-13"
                                className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                                11:00 - 11:30
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input
                                onChange={handleChange}
                                id="checkbox-item-14"
                                type="checkbox"
                                value="11:30 - 12:00"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="checkbox-item-14"
                                className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                                11:30 - 12:00
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input
                                onChange={handleChange}
                                id="checkbox-item-15"
                                type="checkbox"
                                value="12:00 - 12:30"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="checkbox-item-15"
                                className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                                12:00 - 12:30
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input
                                onChange={handleChange}
                                id="checkbox-item-16"
                                type="checkbox"
                                value="12:30 - 01:00"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="checkbox-item-16"
                                className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                                12:30 - 01:00
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
