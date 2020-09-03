export const isLoggedOut = () =>{
    return {
        type: "SIGN_OUT"
    };
};

export const setToken = (email, token, UserID, role) =>{
    return {
        type: "UPDATE_TOKEN",
        emailData: email,
        tokenData: token,
        IdData: UserID,
        roleData: role
    };
};
