import { homeAxiosInstance } from "./api/homeAxiosInstance"

export const searchProductService =async (data) =>{
    const res = await homeAxiosInstance('/search',  {
        params: data.queryKey[1],
    })
    return res.data
}