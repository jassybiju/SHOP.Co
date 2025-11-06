import { adminAxiosInstance } from "@/lib/axios"

export const getDashboardService = async() => {
    const res = await adminAxiosInstance.get('dashboard')
    return res.data
}