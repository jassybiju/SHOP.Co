import { axiosInstance } from "@/lib/axios"

export const getHomeDataService = async(data) => {
    const res = await axiosInstance('/home')
    return res.data
}