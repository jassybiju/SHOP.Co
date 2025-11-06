import { useQuery } from "@tanstack/react-query"
import { getDashboardService } from "../services/dashboard.service"

export const useGetDashboard = () =>{
    return useQuery({
        queryKey :['dashboard'],
        queryFn : getDashboardService
    })
}