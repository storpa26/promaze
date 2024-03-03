import React, { useEffect, useRef, useState } from "react";
import ChatBox from "./ChatBox";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    limit,
} from "firebase/firestore";
import Receiver from "./Receiver";
import Sender from "./Sender";
import { firebaseDB } from "../../../lib/firebase";

export default function Messaging({ teamId, currentUserEmail }) {
    const [messages, setMessages] = useState([]);
    const scrollToBottomRef = useRef(null);

    useEffect(() => {
        // Create a query to get messages from the message subcollection
        const messageRef = collection(firebaseDB, `chats/${teamId}/messages`);
        const messageByTime = query(
            messageRef,
            orderBy("createdAt"),
            limit(20)
        );

        // Set up a listener to update the state variable when the messages change
        const unsubscribe = onSnapshot(messageByTime, (snapshot) => {
            const messagesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(messagesData);
        });

        return unsubscribe; // Clean up the listener on unmount
    }, [teamId]);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        scrollToBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="m-5 w-96 border-2 border-slate-200 rounded-lg">
            <div className="my-2 block px-4 py-2 font-semibold text-2xl text-center text-websiteBlue rounded-t-lg bg-gray-50 shadow-md">
                Live Chat
            </div>
            <div className="bg-gray-50 h-96 overflow-y-auto">
                {messages.map((message) =>
                    message.email === currentUserEmail ? (
                        <Receiver key={message.id} messageInfo={message} />
                    ) : (
                        <Sender key={message.id} messageInfo={message} />
                    )
                )}

                <div ref={scrollToBottomRef} />
            </div>
            <ChatBox teamId={teamId} />
        </div>
    );
}
