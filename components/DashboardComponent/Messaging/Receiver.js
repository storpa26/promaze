import Image from "next/image";
import React from "react";
import avatar from "../../../public/asset/Shared/avatar.svg";
export default function Receiver({ messageInfo }) {
    return (
        <div className="pb-1 pl-4 pr-4">
            <div className="flex justify-end">
                <div className="flex items-center">
                    <span className="font-medium text-black px-1 text-sm">
                        {messageInfo.name}
                    </span>
                </div>
                <Image
                    className="rounded-full w-6 h-6"
                    src={avatar}
                    alt="avatar"
                />
            </div>
            <div className="flex justify-end w-full pl-3">
                <div className="bg-websiteBlue hover:bg-blue-600 w-72 mt-1 mx-3 rounded-b-lg rounded-tl-lg text-white text-sm mb-1.5">
                    <div className="px-3 py-2">{messageInfo.text}</div>
                </div>
            </div>
        </div>
    );
}
