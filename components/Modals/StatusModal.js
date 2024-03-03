import React from "react";
import ModalContent from "./ModalContent";

const StatusModal = ({ modalStatus, setShowModal }) => {
    return (
        <div className="flex justify-center items-center backdrop-blur-sm fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
            <div className="relative w-full h-full max-w-md md:h-auto">
                <div className="relative bg-white rounded-lg shadow ">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        onClick={() => {
                            setShowModal(false);
                        }}
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    <div className="p-6 text-center">
                        {modalStatus.status === "success" ? (
                            <ModalContent
                                status={modalStatus.status}
                                statusMessage={modalStatus.message}
                                setShowModal={setShowModal}
                                redirect={modalStatus.redirect}
                                query={modalStatus.query}
                            />
                        ) : modalStatus.status === "error" ? (
                            <ModalContent
                                status={modalStatus.status}
                                statusMessage={modalStatus.message}
                                setShowModal={setShowModal}
                                redirect={modalStatus.redirect}
                                query={modalStatus.query}
                            />
                        ) : modalStatus.status === "loading" ? (
                            <ModalContent
                                status={modalStatus.status}
                                statusMessage={modalStatus.message}
                                setShowModal={setShowModal}
                                redirect={modalStatus.redirect}
                                query={modalStatus.query}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StatusModal;
