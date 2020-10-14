const reportsInfo = (state = [{reportId: 4, reportUserName: 'abi', reportUserId:2, reportProjectName: 'BlueHawk', reportStatus: "10:20", reportDate: 'Wed Jun 25 2020 00:00:00 GMT+0300 (Israel Daylight Time)', reportFrom: '08:00', reportTo: '18:30'},
                              {reportId: 3, reportUserName: 'abi', reportUserId:2, reportProjectName: 'Matah', reportStatus: "06:20", reportDate: 'Wed Jun 23 2020 00:00:00 GMT+0300 (Israel Daylight Time)', reportFrom: '09:15', reportTo: '22:30'},
                              {reportId: 2, reportUserName: 'Cloe Richards', reportuserId:1, reportProjectName: 'Matah', reportStatus: "01:20", reportDate: 'Wed Jun 12 2020 00:00:00 GMT+0300 (Israel Daylight Time)', reportFrom: '08:30', reportTo: '19:20'},
                              {reportId: 1, reportUserName: 'abi', reportUserId:2, reportProjectName: 'BlueHawk', reportStatus: "08:20", reportDate: 'Wed Jun 13 2020 00:00:00 GMT+0300 (Israel Daylight Time)', reportFrom: '09:15', reportTo: '22:30'},
                              {reportId: 0, reportUserName: 'abi', reportUserId:2, reportProjectName: 'Matah', reportStatus: "00:30", reportDate: 'Wed Jun 16 2020 00:00:00 GMT+0300 (Israel Daylight Time)', reportFrom: '09:15', reportTo: '22:30'},
                            ], action) =>{
    switch (action.type){
        case "ADD_WORK_HOURS":
            if(state.length === 0){
                return state=[{reportId: 0, reportUserName: action.reportUserNameData , reportUserId: action.reportUserIdData, reportProjectName: action.reportProjectNameData, reportStatus: action.reportStatusData, reportDate: action.reportDateData, reportFrom: action.reportFromData, reportDescription: action.reportDescriptionData, reportTo: action.reportToData }
                    ,...state];
            }
            else{
                return state=[{reportId: state.length, reportUserName: action.reportUserNameData, reportUserId: action.reportUserIdData, reportProjectName: action.reportProjectNameData, reportStatus: action.reportStatusData, reportDate: action.reportProjectDateData, reportFrom: action.reportProjectFromData, reportDescription: action.reportDescriptionData, reportTo: action.reportProjectToData }
                    ,...state];
            }
        default:
            return state;
    }
};

export default reportsInfo;
