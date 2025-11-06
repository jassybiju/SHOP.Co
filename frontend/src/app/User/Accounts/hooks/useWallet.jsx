import { useMutation, useQuery } from "@tanstack/react-query"
import { addMoney, getWallet } from "../services/wallet.service.js"

export const useGetWallet = () => {
    return useQuery({
        queryFn : getWallet,
        queryKey : ['wallet']
    })
}

export const useAddAmount = () => {
    return useMutation({
        mutationFn : addMoney
    })
}

