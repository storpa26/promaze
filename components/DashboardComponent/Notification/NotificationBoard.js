import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NotificationBoard() {
    const [notifications, setNotifications] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/get-notifications")
            .then((response) => {
                let notificationArray = [];
                response.data.forEach((notification) => {
                    const timestamp = new Date(notification.createdAt);
                    let timeFormate = timestamp.toLocaleString();
                    let notificationObject = {
                        message: notification.message,
                        time: timeFormate,
                    };
                    notificationArray.push(notificationObject);
                });
                setNotifications(notificationArray);
            });
    }, []);

    return (
        <div className="m-5 w-96 h-fit border-2 border-slate-200 rounded-lg">
            <div className="my-2 block px-4 py-2 font-semibold text-2xl text-center text-websiteBlue rounded-t-lg bg-gray-50 shadow-md">
                Notifications
            </div>

            <div className="h-96 overflow-y-auto">
                {notifications
                    ? notifications.map((notification) => (
                          <div
                              key={notification.time} // for now
                              className="flex px-4 py-3 hover:bg-gray-200"
                          >
                              <div className="w-full pl-3">
                                  <div className="text-gray-500 text-sm mb-1.5">
                                      {notification.message}
                                  </div>
                                  <div className="text-xs text-blue-600">
                                      {notification.time}
                                  </div>
                              </div>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
}
