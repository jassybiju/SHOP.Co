import { homeAxiosInstance } from "./api/homeAxiosInstance"

export const getHomeDataService = async(data) => {
    const res = await homeAxiosInstance('/')
    return res.data
}