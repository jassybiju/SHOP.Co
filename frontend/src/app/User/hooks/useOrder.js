import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { cancelOrder, getAllOrder, getOrder, placeOrder, returnOrder } from "../services/order.service"
import toast from "react-hot-toast"

export const usePlaceOrder = () => {
    return useMutation({
        mutationFn : placeOrder
    })
}

export const useGetAllOrder = (params) => {
    return useQuery({
        queryFn: getAllOrder,
        queryKey : ['order', params],
        placeholderData : keepPreviousData
    })
}
export const useGetOrder= (id) => {
    return useQuery({
        queryKey :['order', id],
        queryFn : ()=>getOrder(id)
    })
}

export const useCancelOrder = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : cancelOrder,
        onSuccess :(data)=>{ queryClient.invalidateQueries({queryKey : ['order']});
        toast.success(data.message)
    },onError: (res) => toast.error(res.response.data.message)
    })
}

export const useReturnOrder =() => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : returnOrder,
        onSuccess :(data)=>{ queryClient.invalidateQueries({queryKey : ['order']});
        toast.success(data.message)
    },onError: (res) => toast.error(res.response.data.message)
    })
}