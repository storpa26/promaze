import React from "react";
import CreateProjectForm from "../components/CreateProjectComponent/CreateProjectForm";

import CommitteeDashboard from "../components/DashboardComponent/CommitteeDashboard/CommitteeSidebar";
import OpenPortal from "../components/DashboardComponent/CommitteeDashboard/CommitteeFeatures/OpenPortal";
import ProgressBar from "../components/DashboardComponent/StudentDashboardComponent/ProgressBar/ProgressBar";

import DefSchedule from "../components/DefSchedule/DefSchedule";

import HomePage from "../components/HomePage/HomePage";
import CalenderPicker from "../components/DefSchedule/CalenderPicker";
import GeneratedSchedule from "../components/DefSchedule/GenerateSchedule";
import CommitteeSidebar from "../components/DashboardComponent/CommitteeDashboard/CommitteeSidebar";
import SupervisorDashboard from "../components/DashboardComponent/SupervisorDashboard";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import EachStudent from "../components/StudentList/EachStudent";
import FooterComponent from "../components/FooterComponent/FooterComponent";
import StudentDashboard from "../components/DashboardComponent/StudentDashboard";
const Index = () => {
    return (
        <div>
            {/* <HeaderComponent /> */}
            {/* <HomePage /> */}
            {/* <SearchBar /> */}
            {/* <EachStudent /> */}
            {/* <SupervisorDashboard /> */}
            {/* <NotificationBoard /> */}
            <DefSchedule />
            {/* <OpenPortal /> */}
            {/* <CommitteeDashboard /> */}
            {/* <ProgressBar /> */}
            {/* <CommitteeSidebar /> */}
            {/* <FooterComponent />  */}
            {/* <StudentDashboard /> */}
        </div>
    );
};
export default Index;
