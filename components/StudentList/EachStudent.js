import Image from "next/image";
import React from "react";
import avatar from "../../public/asset/Shared/avatar.svg";

export default function EachStudent(props) {
    const { name, studentId, batch, section } = props.student
    return (
        <tbody className="text-base">
            <tr className="bg-white border-b hover:bg-gray-100">
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                    <div className="flex">
                        <div>
                            <Image src={avatar} alt="" height={40} width={40} />
                        </div>
                        <div className="mt-3">
                            <span className="px-2">{name}</span>
                        </div>
                    </div>
                </th>
                <td className="px-6 py-4 text-center">{studentId}</td>
                <td className="px-6 py-4 text-center">53</td>
                <td className="px-6 py-4 text-center">{section}</td>
                <td className="px-6 py-4 text-center">
                </td>
            </tr>
        </tbody>
    );
}