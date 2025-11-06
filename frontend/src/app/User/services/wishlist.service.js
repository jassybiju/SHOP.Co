import { wishlistAxiosInstance } from "@/lib/axios";


export const getAllWishlist = async() => {
    const res = await wishlistAxiosInstance.get("/")
    return res.data
}

export const addWishlistItem = async (variant_id  ) => {
    console.log(variant_id )
    const res = await wishlistAxiosInstance.post('/',{variant_id,})
    return res.data
}

export const removeWishlistItem = async(cart_id) => {
    const res = await wishlistAxiosInstance.delete(cart_id)
    return res.data
}