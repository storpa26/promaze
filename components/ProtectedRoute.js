import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push("/");
        }
    }, [currentUser, router]);

    return <>{currentUser ? children : null}</>;
};

export default ProtectedRoute;
