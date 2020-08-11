  
const loggedReducer = (state ="", action)=>{
    switch(action.type){
        case 'SIGN_OUT':
            state = ""
            return state; 
        case 'UPDATE_TOKEN':
            state = {email:action.emailData, token:action.tokenData, id: action.idData }
            return state; 
        default:
            return state;
    }
};

export default loggedReducer;