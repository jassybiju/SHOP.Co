import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getAllUsers, getUserById } from "../services/user-management.service"


export const useGetAllUsers = (params) => {
    
    return useQuery({
        queryKey : ['users', params],
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