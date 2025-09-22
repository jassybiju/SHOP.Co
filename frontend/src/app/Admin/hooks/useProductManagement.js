import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProduct, editProduct, getAllProducts, getProduct, toggleProductActive } from "../services/product-management.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useAddProduct = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(["product"]);
            toast.success("Product Added Successfully");
            navigate('/admin/product-management')
        },
        onError : (error) => {
            toast.error('Error in product adding : '+error.response.data.message)
            console.log(error.response.data.message)
        }
    });
};

export const useGetAllProducts = (params) => {
    return useQuery({
        queryKey: ["product", params],
        queryFn: getAllProducts,
        placeholderData: keepPreviousData,
    });
};
export const useGetProduct = (id) => {
    

    return useQuery({
        queryKey: ["product", { id }],
        queryFn: ()=>getProduct(id),
        enabled: !!id,
    });
};

export const useEditProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: editProduct,
        onSuccess: () => queryClient.invalidateQueries(["product"]),
    });
};

export const useToggleProductStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : toggleProductActive,
        onSuccess : ()=> queryClient.invalidateQueries(['product'])
    })
}