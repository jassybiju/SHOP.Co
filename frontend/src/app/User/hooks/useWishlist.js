import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addWishlistItem, getAllWishlist, removeWishlistItem } from "../services/wishlist.service"
import toast from "react-hot-toast"


export const useGetAllWishlist = () => {
    return useQuery({
        queryFn: getAllWishlist,
        queryKey  :['wishlist']
    })
}


export const useAddWishlistItems = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : addWishlistItem,
        onSuccess : (data) => {queryClient.invalidateQueries({queryKey : ['wishlist']});
        queryClient.invalidateQueries({queryKey : ['search']});
        queryClient.invalidateQueries({queryKey : ['Home']});
    toast.success(data.message)},
    onError: (res) => toast.error(res.response.data.message || "Nadf")
    })
}

export const useRemoveWishlistItems = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : removeWishlistItem,
        onSuccess : () => queryClient.invalidateQueries({queryKey : ['wishlist']})
    })
}
