  
const loggedReducer = (state = {isLogged:false, user:"", userIndex:null}, action)=>{
    switch(action.type){
        case 'SIGN_IN':
            state = {isLogged: true, user: "user", userIndex: action.userIndexData}
            return state;
        case 'ADMIN':
            state = {isLogged: true, user: "admin", userIndex: null}
            return state;
        case 'SIGN_OUT':
            state = {isLogged: false, user: "", userIndex: null}
            return state; 
        default:
            return state;
    }
};

export default loggedReducer;