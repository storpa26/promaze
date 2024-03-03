import axios from "axios";

export const setNewUser = async (userInfo) => {
    let status = {};
    try {
        await axios
            .post("/api/send-user", userInfo)
            .then((res) => {
                console.log("successfully added user to database");
                status = { status: res.status };
            })
            .catch((err) => {
                status = { status: err.response.status, message: err.message };
            });
    } catch (error) {
        alert(error);
    }
    return status;
};

export const assignNewTask = async (task) => {
    let status = {};
    try {
        await axios
            .post("/api/assign-task", task)
            .then((res) => {
                console.log("successfully added task to database");
                status = { status: res.status };
            })
            .catch((err) => {
                status = { status: err.response.status, message: err.message };
            });
    } catch (error) {
        alert(error);
    }
    return status;
};

export const addProject = async (project_info) => {
    let status = {};
    try {
        await axios
            .post("/api/add-project", project_info)
            .then((res) => {
                console.log("successfully added project to database");
                status = { status: res.status };
            })
            .catch((err) => {
                status = { status: err.response.status, message: err.message };
            });
    } catch (error) {
        alert(error);
    }
    return status;
};

export const removeRequest = async (project_info) => {
    try {
        await axios
            .post("/api/remove-request", project_info)
            .then((res) => {
                console.log("successfully removed request from database");
            })
            .catch((err) => {
                alert(err);
            });
    } catch (error) {
        alert(error);
    }
};

export const acceptRequest = async (project_info, toast) => {
    try {
        await axios
            .post("/api/accept-request", project_info)
            .then((res) => {
                toast(res.data.message);
            })
            .catch((err) => {
                toast(res.data.message);
            });
    } catch (error) {
        alert(error);
    }
};

export const handleTaskStatus = async (task_info) => {
    try {
        await axios
            .post("/api/change-task-status", task_info)
            .then((res) => {
                console.log("successfully added request to database");
            })
            .catch((err) => {
                alert(err);
            });
    } catch (error) {
        alert(error);
    }
};

export const addPortal = async (portal_info) => {
    let status = {};
    try {
        await axios
            .post("/api/add-portal", portal_info)
            .then((res) => {
                console.log(res.data.message);
                status = { status: res.status };
            })
            .catch((err) => {
                console.log(err);
                status = { status: err.response.status, message: err.message };
            });
    } catch (error) {
        alert(error);
    }
    return status;
};

export const handlePortalStatus = async (portal_info) => {
    try {
        await axios
            .post("/api/change-portal-status", portal_info)
            .then((res) => {
                console.log("successfully added request to database");
            })
            .catch((err) => {
                alert(err);
            });
    } catch (error) {
        alert(error);
    }
};
