import { axiosInstance, } from "@/lib/axios"

export const getWallet = async() =>{
    const res = await axiosInstance.get('wallet/')
    return res.data
}

export const addMoney = async(data) => {
    const res= await axiosInstance.post('wallet/',data)
    return res.data
}