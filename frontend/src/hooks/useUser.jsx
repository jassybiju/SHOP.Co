import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../app/Auth/services/auth.service";

export function useUser(){
    return useQuery({
        queryKey : ['user'],
        queryFn : fetchUser,
        retry : false,
        staleTime : 5 * 60 * 1000
    })
}