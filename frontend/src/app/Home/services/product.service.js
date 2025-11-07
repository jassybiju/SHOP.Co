import { axiosInstance,  } from "@/lib/axios"

export const getProductService = async({queryKey}) => {
    console.log(queryKey[1].id)
    const res = await axiosInstance('home/product/'+queryKey[1].id)
    return res.data
}