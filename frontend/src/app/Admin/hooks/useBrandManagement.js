import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {addBrand, editBrand, getAllBrands, getBrand} from '../services/brand-management.service'
export const useGetAllBrands = (params) => {
    return useQuery({
        queryKey: ["brand", params],
        queryFn: getAllBrands,
        placeholderData: keepPreviousData,
    });
};

export const useAddBrand = () => {
    const queryClient =useQueryClient();
    return useMutation({
        mutationFn: addBrand,
        onSuccess: () => queryClient.invalidateQueries(["brand"]),
    });
};
export const useGetBrand = (id) => {
    console.log(id)

    return useQuery({
        queryKey: ["brand", { id }],
        queryFn: ()=>getBrand(id),
        enabled: !!id,
    });
};

export const useEditBrand = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: editBrand,
        onSuccess: () => queryClient.invalidateQueries(["brand"]),
    });
};
