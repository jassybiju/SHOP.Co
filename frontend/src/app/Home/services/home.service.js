import { homeAxiosInstance } from "@/lib/axios"

export const getHomeDataService = async(data) => {
    const res = await homeAxiosInstance('/')
    return res.data
}