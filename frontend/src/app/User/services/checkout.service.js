import { checkoutAxiosInstance } from "@/lib/axios"
import axios from "axios"

export const getCheckout = async () => {
    const res = await checkoutAxiosInstance.get('/')
    console.log(res.data)
    return res.data
}