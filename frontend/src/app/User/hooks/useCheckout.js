import { useMutation, useQuery } from "@tanstack/react-query"
import { getCheckout } from "../services/checkout.service"


export const useCheckout = ()=> {
return    useQuery({
    queryFn : getCheckout,
    queryKey : ['checkout'],
    retry : 1
})
}