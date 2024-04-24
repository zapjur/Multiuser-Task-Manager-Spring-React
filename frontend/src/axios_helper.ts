import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Content-Type"] = 'application/json';

export const getAuthToken = (): string | null => {
    return window.localStorage.getItem("auth_token");
};

export const setAuthToken = (token: string): void => {
    window.localStorage.setItem("auth_token", token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};


export const request = (method: "get" | "post" | "put" | "delete", url: string, data?: object) => {
    let headers: { Authorization?: string } = {};
    const authToken = getAuthToken();
    if(authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }


    return axios({
        method: method,
        url: url,
        data: data,
        headers: headers
    });
};
