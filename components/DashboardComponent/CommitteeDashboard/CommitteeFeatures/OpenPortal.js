import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineProject } from "react-icons/Ai";
import { AiOutlineFileAdd } from "react-icons/Ai";
import { AiFillEdit } from "react-icons/Ai";
import { addPortal } from "../../../../utils/clientAPI/sendRequest";
import PortalCard from "./PortalCard";
import PortalForm from "./PortalForm";
export default function OpenPortal() {
    const [isOpen, setIsOpen] = useState(false);
    const [course, setCourse] = useState([]);
    const [portals, setPortals] = useState();

    const [modalStatus, setModalStatus] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [reRender, setRerender] = useState(false);

    const handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        const newCourse = { ...course };
        newCourse[field] = value;
        setCourse(newCourse);
    };

    const handlePortalSwitch = (event) => {
        setIsOpen(event.target.checked);
        console.log(event.target.checked);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        setModalStatus({
            status: "loading",
            message: "Setting up everything please wait",
        });
        setShowModal(true);

        try {
            const newPortalStatus = await addPortal(course);
            if (newPortalStatus.status === 200) {
                console.log(newPortalStatus);
                setModalStatus({
                    status: "success",
                    message: "Portal added successfully",
                });
            } else {
                setModalStatus({
                    status: "error",
                    message: "Something went wrong",
                });
            }
        } catch (error) {
            setModalStatus({ status: "error", message: error.message });
        }
    };
    useEffect(() => {
        axios.get("http://localhost:3000/api/get-portals").then((response) => {
            setPortals(response.data);
        });
    }, [reRender]);

    return (
        <div className="m-5 w-96 border-2 border-slate-300 rounded-lg h-full overflow-y-scroll">
            <PortalCard
                portals={portals}
                reRender={reRender}
                setRerender={setRerender}
            />
            <PortalForm
                handleChange={handleChange}
                handleFormSubmit={handleFormSubmit}
                showModal={showModal}
                modalStatus={modalStatus}
                setShowModal={setShowModal}
            />
        </div>
    );
}
