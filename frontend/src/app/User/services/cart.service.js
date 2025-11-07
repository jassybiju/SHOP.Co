import { axiosInstance } from "@/lib/axios"


export const getAllCart = async() => {
    const res = await axiosInstance.get("cart/")
    return res.data
}

export const updateCartItem = async ({variant_id , quantity }) => {
    console.log(variant_id , quantity)
    const res = await axiosInstance.post('cart/',{variant_id, quantity})
    return res.data
}

export const removeCartItem = async(cart_id) => {
    const res = await axiosInstance.delete('cart/'+cart_id)
    return res.data
}