import Image from "next/image";
import React from "react";
import avatar from "../../../public/asset/Shared/avatar.svg";
export default function Sender({ messageInfo }) {
    return (
        <div className="pb-1 pl-4 pr-4">
            <div className="flex">
                <Image
                    className="rounded-full w-6 h-6"
                    src={avatar}
                    alt="avatar"
                />
                <div className="flex items-center">
                    <span className="font-medium text-black px-1 text-sm">
                        {messageInfo.name}
                    </span>
                </div>
            </div>
            <div className="w-full pl-3">
                <div className="bg-gray-200 hover:bg-gray-400 w-72 mt-1 mx-3 rounded-b-lg rounded-tr-lg  text-black text-sm mb-1.5">
                    <div className="px-3 py-2">{messageInfo.text}</div>
                </div>
            </div>
        </div>
    );
}
