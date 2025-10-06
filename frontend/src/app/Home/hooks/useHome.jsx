import { useQuery } from "@tanstack/react-query"
import { getHomeDataService } from "../services/home.service"


export const useHome = ()=>{
    return useQuery({
        queryFn : getHomeDataService,
        queryKey : ['Home']
    })
}

