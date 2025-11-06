
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllOrder, getOrder, returnOrderItemStatus, updateOrderStatus } from "../services/order-management.service"
import toast from "react-hot-toast"

export const useGetAllOrder = (params) => {
    return useQuery({
        queryKey : ['admin-order', params],
        queryFn : getAllOrder,
        placeholderData : keepPreviousData
    })
}

export const useGetOrder = (id) => {
      return useQuery({
            queryKey: ["admin-order", { id }],
            queryFn: ()=>getOrder(id),
            enabled: !!id,
    });
}

export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : updateOrderStatus,
        onSuccess :(data)=>{ queryClient.invalidateQueries({queryKey : ['admin-order']});
        toast.success(data.message)
    },onError: (res) => toast.error(res.response.data.message)
    })
}
export const useReturnOrderItemStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : returnOrderItemStatus,
        onSuccess :(data)=>{ queryClient.invalidateQueries({queryKey : ['admin-order']});
        toast.success(data.message)
    },onError: (res) => toast.error(res.response.data.message)
    })
}