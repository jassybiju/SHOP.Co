import { checkoutAxiosInstance } from "@/lib/axios"
import axios from "axios"

export const getCheckout = async (state) => {
    console.log(state)
    console.log(!!state)
    const res = await checkoutAxiosInstance.get('/',{params : {buyNow :!!state ,...state }})
    console.log(res.data)
    return res.data
}