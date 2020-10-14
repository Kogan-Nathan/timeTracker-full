// const projectInfo = (state = [{projectName: 'theAcademi', projectClient: 'Misrad ahinuh',projectManager: 'Yoni S', projectPrivacy: true, projectDate: '10-11-2020', projectCost: true, projectStatus: 200},
//                               {projectName: 'bila-store', projectClient: 'Bilag-Bong',projectManager: 'Yoni S', projectPrivacy: true, projectDate: '22-02-2020', projectCost: true, projectStatus: 127},  
//                               {projectName: 'haSifriya', projectClient: 'kiryan uno library',projectManager: 'Yoni S', projectPrivacy: true, projectDate: '17-05-2019', projectCost: false, projectStatus: 639}
// ], action) =>{
//     switch (action.type){

//         case "ADD_PROJECT":
//             return state=[{projectName: action.projectNameData, projectClient: action.projectClientData, projectStatus: 0, projectManager: action.projectManagerData, projectPrivacy: action.ProjectPrivacyData, ProjectDate: action.projectDateDate, projectCost: action.projectCostData}
//                 ,...state];

//         case "DELETE_PROJECT":
//             let temp = state.filter(value=> value !== action.projectNameData)
//             state = temp;
//             return state = [...state];

//         case "DELETE_MULTIPLE_PROJECTS":
//             // let projectsToBeDeleted = action.projectsToBeDeletedData;
//             let tempProjects =  state.filter(value => !action.projectsToBeDeletedData.includes(value.projectName))
//                 state = tempProjects;
//                 return state = [...state];
                
//         case "UPDATE_CLIENT":
//             state[action.projectDataIndexData].projectClient = action.inputData;
//             return state = [...state];

//         case "UPDATE_STATUS":
//             state[action.projectDataIndexData].projectStatus = state[action.projectDataIndexData].projectStatus + action.inputStatusData;
//             return state = [...state];

//         // case "DATE_BEGIN":
//         //         ///

//         case "UPDATE_PM":
//             state[action.projectDataIndexData].projectManager = action.inputData;
//             return state = [...state];

//         case "UPDATE_PRIVACY":
//             state[action.projectDataIndexData].projectPrivacy = action.inputData;
//             return state = [...state];

//         case "PROJECT_COST":
//             state[action.projectDataIndexData].projectCost = action.inputData;
//             return state = [...state];

//     default: return state
//     }   
// }
// export default projectInfo;