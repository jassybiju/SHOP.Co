import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProductStock, restokeProduct } from "../services/stock-management.service";
import toast from "react-hot-toast";

export const useGetAllProductStatus = (params) => {
    return useQuery({
        queryKey: ["stock", params],
        queryFn: getAllProductStock,
        placeholderData: keepPreviousData,
    });
};

export const useRestokeProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : restokeProduct,
        onSuccess : (data) => {
            queryClient.invalidateQueries({queryKey : ['stock']})
            toast.success(data.message)
        },
        onError : (data) => {
            console.log(data)
            toast.error(data.response.data.message)
        }
    })
}