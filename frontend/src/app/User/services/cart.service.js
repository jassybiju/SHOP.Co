import { cartAxiosInstance } from "@/lib/axios"


export const getAllCart = async() => {
    const res = await cartAxiosInstance.get("/")
    return res.data
}

export const updateCartItem = async ({variant_id , quantity }) => {
    console.log(variant_id , quantity)
    const res = await cartAxiosInstance.post('/',{variant_id, quantity})
    return res.data
}

export const removeCartItem = async(cart_id) => {
    const res = await cartAxiosInstance.delete(cart_id)
    return res.data
}