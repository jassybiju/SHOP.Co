import axios from "axios";


export const adminAxiosInstance = axios.create({
    baseURL : import.meta.env.VITE_BASE_URI + 'admin',
    withCredentials : true
})