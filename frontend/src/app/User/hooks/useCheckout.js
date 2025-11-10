import {  useQuery } from "@tanstack/react-query"
import { getCheckout } from "../services/checkout.service"


export const useCheckout = (state)=> {

return    useQuery({
    queryFn : ()=>getCheckout(state),
    queryKey : ['checkout'],
    retry : 1
})
}