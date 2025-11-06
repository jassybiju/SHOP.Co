import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    addCategory,
    editCategory,
    getCategories,
    getCategory,
    toggleCategoryStatus,
} from "../services/category-management.service";

export const useGetAllCategories = (params) => {
    return useQuery({
        queryKey: ["category", params],
        queryFn: getCategories,
        placeholderData: keepPreviousData,
    });
};

export const useAddCategory = () => {
    const queryClient =useQueryClient();
    return useMutation({
        mutationFn: addCategory,
        onSuccess: () => queryClient.invalidateQueries(["category"]),
    });
};
export const useGetCategory = (id) => {
    return useQuery({
        queryKey: ["category", { id }],
        queryFn: () => getCategory(id),
        enabled: !!id,
    });
};

export const useEditCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: editCategory,
        onSuccess: () => queryClient.invalidateQueries(["category"]),
    });
};

export const useToggleCategoryStatus = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : toggleCategoryStatus,
        onSuccess : () => queryClient.invalidateQueries(['category'])
    })
}