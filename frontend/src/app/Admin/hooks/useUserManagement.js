import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllUsers, getUserById, toggleUserActiveStatusById } from "../services/user-management.service"


export const useGetAllUsers = (params) => {
    
    return useQuery({
        queryKey : ['user', params],
        queryFn : getAllUsers,
        placeholderData : keepPreviousData
    })
}

// TODO
export const useGetUser = (userId) =>{
    return useQuery({
        queryKey : ['user', userId],
        queryFn : getUserById,

    })
}

export const useToggleUserActiveStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : toggleUserActiveStatusById,
        onSuccess : (data) => {
            queryClient.invalidateQueries(['user'])
        }
    })
}