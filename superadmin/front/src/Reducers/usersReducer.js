const UsersReducer = (state = [{name:"Bob Brown", password:"timeUserCheck1234", email:"timeUser@gmail.com", phone:"+972505555123", id:0, status:0},
                                {name:"Cloe Richards", password:"timeUserCheck1234", email:"timeUser@gmail.com", phone:"+972505555123", id:1, status:0},
                                {name:"John Doe", password:"timeUserCheck1234", email:"timeUser@gmail.com", phone:"+972505555123", id:2, status:0}], action)=> {
    switch (action.type) {
        case 'ADD_NEW_USERS':
            if(state.length===0){
                return state=[{name:action.nameData, password:action.passwordData,
                    email:action.emailData, phone:action.phoneData,id:0,status:0}
                    ,...state]
            }
            else{
                return state=[{name:action.nameData, password:action.passwordData,
                    email:action.emailData, phone:action.phoneData,id:state.length+1,status:0}
                    ,...state]
            }

        case 'DELETE_MULTIPLE_USERS':
            // assuming we are sending the users id value as array "usersToBeDeletedData" 
            let usersToBeDeleted=action.usersToBeDeletedData;
            let tempUsers = state.filter(value => !usersToBeDeleted.includes(value.id));

            return state=[...state]
        case 'UPDATE_NAME':
            state[action.userIndexData].name=action.InputData;
            return state=[...state]
        case 'UPDATE_PASSWORD':
            state[action.userIndexData].password=action.InputData;
            return state=[...state]
        case 'UPDATE_EMAIL':
            state[action.userIndexData].email=action.InputData;
            return state=[...state]
        case 'UPDATE_PHONE':
            state[action.userIndexData].phone=action.InputData;
            return state=[...state]
        case 'UPDATE_STATUS':
            state[action.userIndexData].status=state[action.userIndexData].status+action.InputData;
            return state=[...state]

                    
        default:
            return state
    }
}

export default UsersReducer;