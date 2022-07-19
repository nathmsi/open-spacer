



export const setAuthToken = (token) => {
    localStorage.setItem("token", token);
}


export const getAuthToken = () => {
    return localStorage.getItem("token");
}



export const setAuthEmail = (email) => {
    localStorage.setItem("email", email);
}

export const getAuthEmail = () => {
    return localStorage.getItem("email");
}

