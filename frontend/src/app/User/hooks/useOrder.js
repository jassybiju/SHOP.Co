import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { cancelOrder, cancelOrderItem, getAllOrder, getOrder, placeOrder, returnOrder, returnOrderItem } from "../services/order.service"
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

export const useCancelOrderItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : cancelOrderItem,
        onSuccess : (data) => {queryClient.invalidateQueries({queryKey : ['order']}) ;
    toast.success(data.message)},
    onError : (res) => toast.error(res.response.data.message)
    })
}

export const useReturnOrderItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : returnOrderItem,
        onSuccess : (data) => {queryClient.invalidateQueries({queryKey : ['order']}) ;
    toast.success(data.message)},
    onError : (res) => toast.error(res.response.data.message)
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