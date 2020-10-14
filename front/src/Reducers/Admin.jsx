const AdminReducer = (state = {name:"Admin Admin", password:"time123123", email:"timeAdmin@zangula.com", projects:[{project:"BlueHawk",client:"svddsvsd"},{project:"Matah",client:"hjjhm"},{project:"Clockify",client:"kikg"}]}, action)=> {
    switch (action.type) {
            case 'ADMIN_NEW_PROJECT':
                return {...state, projects: [{project : action.projectNameData, client : action.clientNameData},...state.projects]}
            case 'ADMIN_DELETE_PROJECTS':
                // assuming we are sending the users name value as array "projectsToBeDeletedData" 
                // let projectsToBeDeleted=action.projectsToBeDeletedData
                let tempProjects = state.projects.filter(value => !action.projectsToBeDeletedData.includes(value.project));
                return {...state, projects: tempProjects}
            case 'ADMIN_UPDATE_PROJECT' :
                let tempProjectsArray = [...state.projects];
                tempProjectsArray[action.projectIndexData].project = action.projectNameData
                return {...state, projects: tempProjectsArray}             
            case 'ADMIN_UPDATE_CLIENT' :
                let tempArray = [...state.projects];
                tempArray[action.projectIndexData].client = action.clientNameData
                return {...state, projects: tempArray}
        default:
            return state
    }
}

export default AdminReducer;