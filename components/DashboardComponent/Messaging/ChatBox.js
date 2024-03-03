import {
    doc,
    serverTimestamp,
    addDoc,
    setDoc,
    collection,
} from "firebase/firestore";
import React, { useRef } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { firebaseDB } from "../../../lib/firebase";

export default function ChatBox({ teamId }) {
    const currentUserName = useAuth().currentUser.displayName;
    const currentUserEmail = useAuth().currentUser.email;
    const text = useRef(null);

    const handleText = async (e) => {
        e.preventDefault();

        try {
            const chatRef = collection(firebaseDB, "chats");
            const teamIdRef = doc(chatRef, teamId);
            const messagesRef = collection(teamIdRef, "messages");
            const messageObject = {
                name: currentUserName,
                email: currentUserEmail,
                text: text.current.value,
                createdAt: serverTimestamp(),
            };
            await setDoc(teamIdRef, {}, { merge: true })
                .then(async () => {
                    await addDoc(messagesRef, messageObject);
                })
                .catch((error) => {
                    console.error("Error creating teamId document: ", error);
                });
        } catch (error) {
            console.log(error);
        }
        text.current.value = "";
    };

    const handleKey = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleText(e);
        }
    };

    return (
        <form>
            <label htmlFor="chat" className="sr-only">
                Your message
            </label>
            <div className="flex items-center px-3 py-2 rounded-b-lg bg-gray-50">
                <button
                    type="button"
                    className="inline-flex justify-center p-2 text-gray-400 rounded-lg cursor-pointer hover:text-gray-500 hover:bg-gray-100"
                >
                    <svg
                        aria-hidden="true"
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <span className="sr-only">Upload image</span>
                </button>
                <button
                    type="button"
                    className="p-2 text-gray-400 rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100"
                >
                    <svg
                        aria-hidden="true"
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <span className="sr-only">Add emoji</span>
                </button>
                <textarea
                    id="chat"
                    rows="1"
                    ref={text}
                    onKeyDown={handleKey}
                    className="block overflow-hidden mx-4 p-2.5 w-full h-auto resize-none text-sm text-gray-900 bg-white rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your message..."
                />
                <button
                    type="submit"
                    className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100"
                    onClick={handleText}
                >
                    <svg
                        aria-hidden="true"
                        className="w-6 h-6 rotate-90"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                    <span className="sr-only">Send message</span>
                </button>
            </div>
        </form>
    );
}
