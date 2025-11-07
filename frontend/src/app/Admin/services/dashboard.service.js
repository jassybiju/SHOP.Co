import { adminAxiosInstance } from "@/lib/axios"

export const getDashboardService = async(type) => {
    try{
    console.log(type,123)
    const res = await adminAxiosInstance.get('dashboard/',{params : {type}})
    console.log(res)
    return res.data
    }catch(error){
        console.log(error)
    }
}