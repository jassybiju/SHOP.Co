import { axiosInstance,  } from "@/lib/axios";


export const getAllWishlist = async() => {
    const res = await axiosInstance.get("wishlist/")
    return res.data
}

export const addWishlistItem = async (variant_id  ) => {
    console.log(variant_id )
    const res = await axiosInstance.post('wishlist/',{variant_id,})
    return res.data
}

export const removeWishlistItem = async(cart_id) => {
    const res = await axiosInstance.delete('wishlist/'+cart_id)
    return res.data
}