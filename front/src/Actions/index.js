export const addNewProject = (projectName, projectClient, projectManager, projectDate, projectCost) =>{
    return {
        type: "ADD_PROJECT",
        projectNameData : projectName,
        projectClientData : projectClient,
        projectManagerData : projectManager, 
        projectDateDate : projectDate, 
        projectCostData : projectCost
    };
};

// export const deleteSpecificProject = (projectName) =>{
//     return {
//         type: "DELETE_PROJECT",
//         projectNameData : projectName
//     };
// };

export const deleteProjects = (projectsToBeDeleted) =>{
    return {
        type: "DELETE_PROJECTS",
        projectsToBeDeletedData : projectsToBeDeleted
    };
};

export const updateProjectName = (projectIndex, inputValue) =>{
    return {
        type: "UPDATE_PROJECTNAME",
        projectIndexData : projectIndex,
        inputData : inputValue
    };
};

export const updateClient = (projectIndex, inputValue) =>{
    return {
        type: "UPDATE_CLIENT",
        projectIndexData : projectIndex,
        inputData : inputValue
    };
};

export const updateStatus = (projectIndex, inputValue) =>{
    return {
        type: "UPDATE_STATUS",
        projectIndexData : projectIndex,
        inputStatusData : inputValue
    };
};

export const updatePM = (projectIndex, inputValue) =>{
    return {
        type: "UPDATE_PM",
        projectIndexData : projectIndex,
        inputData : inputValue
    };
};

export const updateCost = (projectIndex, inputValue) =>{
    return {
        type: "UPDATE_COST",
        projectIndexData : projectIndex,
        inputData : inputValue
    };
};

export const isLogged = (userIndex) =>{
    return {
        type: "SIGN_IN",
        userIndexData : userIndex
    };
};

export const adminIsLogged = () =>{
    return {
        type: "ADMIN"
    };
};

export const isLoggedOut = () =>{
    return {
        type: "SIGN_OUT"
    };
};

export const adminNewProject = (projectName, clientName) =>{
    return {
        type: "ADMIN_NEW_PROJECT",
        projectNameData : projectName,
        clientNameData : clientName
    };
};

export const adminDeleteProjects = (projectsToBeDeleted) =>{
    return {
        type: "ADMIN_DELETE_PROJECTS",
        projectsToBeDeletedData : projectsToBeDeleted
    };
};

export const adminUpdateProject = (projectIndex, projectName) =>{
    return {
        type: "ADMIN_UPDATE_PROJECT",
        projectIndexData : projectIndex,
        projectNameData : projectName
    };
};

export const adminUpdateClient = (projectIndex, clientName) =>{
    return {
        type: "ADMIN_UPDATE_CLIENT",
        projectIndexData : projectIndex,
        clientNameData : clientName
    };
};

// export const adminAddNewClient = (clientName) =>{
//     return {
//         type: "ADD_NEW_CLIENT",
//         clientNameData : clientName
//     };
// };

// export const adminDeleteClient = (clientIndex) =>{
//     return {
//         type: "ADMIN_DELETE_CLIENT",
//         clientIndexData : clientIndex
//     };
// };

export const addNewUser = (userName, userPassword, userEmail, userPhone) =>{
    return {
        type: "ADD_NEW_USER",
        nameData : userName,
        passwordData : userPassword,
        emailData : userEmail, 
        phoneData : userPhone
    };
};

export const adminDeleteUsers = (usersToBeDeleted) =>{
    return {
        type: "ADMIN_DELETE_USERS",
        usersToBeDeletedData : usersToBeDeleted
    };
};

export const updateUserName = (userIndex, inputValue) =>{
    return {
        type: "UPDATE_USER_NAME",
        userIndexData : userIndex,
        InputData : inputValue
    };
};

export const updateUserPassword = (userIndex, inputValue) =>{
    return {
        type: "UPDATE_USER_PASSWORD",
        userIndexData : userIndex,
        InputData : inputValue
    };
};

export const updateUserEmail = (userIndex, inputValue) =>{
    return {
        type: "UPDATE_USER_EMAIL",
        userIndexData : userIndex,
        InputData : inputValue
    };
};

export const updateUserPhone = (userIndex, inputValue) =>{
    return {
        type: "UPDATE_USER_PHONE",
        userIndexData : userIndex,
        InputData : inputValue
    };
};

export const updateUserStatus = (userIndex, inputValue) =>{
    return {
        type: "UPDATE_USER_STATUS",
        userIndexData : userIndex,
        InputData : inputValue
    };
};

export const addWorkHours = (userName, userID, projectName,projectFrom,projectTo,projectDate,reportDescription,reportStatus) =>{
    return {
        type: "ADD_WORK_HOURS",
        reportUserNameData: userName,
        reportUserIdData : userID,
        reportProjectNameData: projectName,
        reportProjectFromData: projectFrom,
        reportProjectToData: projectTo,
        reportProjectDateData: projectDate,
        reportDescriptionData: reportDescription,
        reportStatusData: reportStatus
    }
}

export const setToken = (email, token) =>{
    return {
        type: "UPDATE_TOKEN",
        emailData: email,
        tokenData : token
    };
};
