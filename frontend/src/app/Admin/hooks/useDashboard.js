import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getDashboardService } from "../services/dashboard.service"

export const useGetDashboard = (type) =>{
    return useQuery({
        queryKey :['dashboard', type],
        queryFn : ()=>getDashboardService(type),
        placeholderData : keepPreviousData
    })
}