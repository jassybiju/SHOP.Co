import { axiosInstance } from "@/lib/axios"

export const getHomeDataService = async() => {
    const res = await axiosInstance('/home')
    return res.data
}