import axios from "axios";


export const homeAxiosInstance = axios.create({
    baseURL : import.meta.env.VITE_BASE_URI + 'home',
})