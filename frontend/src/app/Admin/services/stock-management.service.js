import { adminAxiosInstance } from "@/lib/axios";

export const getAllProductStock = async (data) => {
    const res = await adminAxiosInstance.get("stock/", {
        params: data.queryKey[1],
    });
    return res.data;
};

export const restokeProduct = async ({id , quantity}) => {
    const res= await adminAxiosInstance.patch('stock/'+id,{
        quantity
    })
    return res.data
}