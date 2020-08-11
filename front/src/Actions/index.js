export const isLoggedOut = () =>{
    return {
        type: "SIGN_OUT"
    };
};

export const setToken = (email, token, UserID) =>{
    return {
        type: "UPDATE_TOKEN",
        emailData: email,
        tokenData: token,
        IdData: UserID
    };
};
