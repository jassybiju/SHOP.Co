import { useQuery } from "@tanstack/react-query"
import { getProductService } from "../services/product.service"


export const useProduct = (id) => {
    return useQuery({
        queryFn: getProductService,
        queryKey : ['product', {id}],
    })
}