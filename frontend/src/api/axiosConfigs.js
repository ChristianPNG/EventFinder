import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

//adding an interceptor without logging errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle error without logging it, DOESNT WORK
        return Promise.reject(error);
    }
);

export default api;
