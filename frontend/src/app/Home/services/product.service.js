import { homeAxiosInstance } from "@/lib/axios"

export const getProductService = async({queryKey}) => {
    console.log(queryKey[1].id)
    const res = await homeAxiosInstance('/product/'+queryKey[1].id)
    return res.data
}