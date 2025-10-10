import axios from "axios";

export const accountAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URI + "account",
    withCredentials: true,

});
export const cartAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URI + "cart",
    withCredentials: true,

});
export const homeAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URI + "home",
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

