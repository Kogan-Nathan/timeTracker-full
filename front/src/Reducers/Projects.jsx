const ProjectsReducer = (state = [{projectName: "BlueHawk", projectClient: "svddsvsd", projectStatus: 0, projectManager: "Bob", ProjectDate: "", projectCost: true},
                                    {projectName: "Matah", projectClient: "hjjhm", projectStatus: 0, projectManager: "Boby", ProjectDate: "", projectCost: false},
                                    {projectName: "Clockify", projectClient: "kikg", projectStatus: 0, projectManager: "abi", ProjectDate: "", projectCost: true}], action) =>{
    switch (action.type){
        case "ADD_PROJECT":
            return state=[{projectName: action.projectNameData, projectClient: action.projectClientData, projectStatus: 0, projectManager: action.projectManagerData, ProjectDate: action.projectDateDate, projectCost: action.projectCostData}
                ,...state];
        // case "DELETE_PROJECT":
        //     let temp = state.filter(value=> value !== action.projectNameData)
        //     state = temp;
        //     return state = [...state];
        case "DELETE_PROJECTS":
            // let projectsToBeDeleted = action.projectsToBeDeletedData;
            let tempProjects =  state.filter(value => !action.projectsToBeDeletedData.includes(value.projectName))
                state = tempProjects;
                return state = [...state];   
        case "UPDATE_PROJECTNAME":
            state[action.projectIndexData].projectName = action.inputData;
            return state = [...state];    
        case "UPDATE_CLIENT":
            state[action.projectIndexData].projectClient = action.inputData;            
            return state = [...state];
        case "UPDATE_STATUS":
            state[action.projectIndexData].projectStatus = state[action.projectIndexData].projectStatus + action.inputStatusData;
            return state = [...state];
        case "UPDATE_PM":
            state[action.projectIndexData].projectManager = action.inputData;
            return state = [...state];
        case "UPDATE_COST":
            state[action.projectIndexData].projectCost = action.inputData;
            return state = [...state];
    default: return state
    }   
}
export default ProjectsReducer;