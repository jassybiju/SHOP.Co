import { walletAxiosInstance } from "@/lib/axios"

export const getWallet = async() =>{
    const res = await walletAxiosInstance.get('')
    return res.data
}

export const addMoney = async(data) => {
    const res= await walletAxiosInstance.post('',data)
    return res.data
}