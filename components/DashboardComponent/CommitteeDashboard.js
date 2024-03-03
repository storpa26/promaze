import React from "react";
import OpenPortal from "./CommitteeDashboard/CommitteeFeatures/OpenPortal";
import CommitteeSidebar from "./CommitteeDashboard/CommitteeSidebar";

const CommitteeDashboard = () => {
    return (
        <div className="flex justify-center">
            <CommitteeSidebar />
            <OpenPortal />
        </div>
    );
};

export default CommitteeDashboard;
