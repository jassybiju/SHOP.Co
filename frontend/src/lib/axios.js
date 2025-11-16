import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URI + "",
    withCredentials: true,
});

export const authAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URI + "auth",
    withCredentials: true,
});

export const adminAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URI + "admin",
    withCredentials: true,
});

