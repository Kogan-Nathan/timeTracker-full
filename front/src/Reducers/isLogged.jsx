  
const loggedReducer = (state ="", action)=>{
    switch(action.type){
        case 'SIGN_IN':
            state = {isLogged: true, user: "user", userIndex: action.userIndexData}
            return state;
        case 'ADMIN':
            state = {isLogged: true, user: "admin", userIndex: null}
            return state;
        case 'SIGN_OUT':
            state = ""
            return state; 
        case 'UPDATE_TOKEN':
            state = {email:action.emailData, token:action.tokenData}
            return state; 
        default:
            return state;
    }
};

export default loggedReducer;