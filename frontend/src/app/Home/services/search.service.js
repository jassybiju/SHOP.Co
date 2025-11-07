import { axiosInstance,  } from "@/lib/axios"

import qs from 'qs'
export const searchProductService =async (data) =>{
    const res = await axiosInstance('home/search',  {
        params: data.queryKey[1],
        paramsSerializer : (params) => qs.stringify(params, {arrayFormat : 'repeat', skipNulls : true})
    })
    console.log(data.queryKey[1])
    return res.data
}