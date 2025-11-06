import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getSalesReport } from "../services/sales-report.service"


export const useGetSalesReport = (params) => {
    return useQuery({
        queryFn : ()=>getSalesReport(params),
        queryKey : ['report',params],
        refetchOnReconnect : false,
        refetchOnMount : false,
        staleTime : Infinity,
        refetchOnWindowFocus :false,
        placeholderData : keepPreviousData
    })
}