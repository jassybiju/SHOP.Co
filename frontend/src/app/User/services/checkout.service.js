import { axiosInstance,  } from "@/lib/axios"
import axios from "axios"

export const getCheckout = async (state) => {
    console.log(state)
    console.log(!!state)
    const res = await axiosInstance.get('checkout/',{params : {buyNow :!!state ,...state }})
    console.log(res.data)
    return res.data
}