import { adminAxiosInstance } from "@/lib/axios";

export const getAllOrder = async (data) => {
    const res = await adminAxiosInstance.get("order/", {
        params: data.queryKey[1],
    });
    return res.data;
};

export const getOrder = async (data) => {
    console.log(data)
    const res = await adminAxiosInstance.get("order/"+data)
    return res.data
}

export const updateOrderStatus = async({id,data}) => {
    const res = await adminAxiosInstance.patch('order/'+id , data)
    return res.data

}

export const returnOrderItemStatus = async({id,itemId,data}) => {
    const res = await adminAxiosInstance.patch(`order/${id}/${itemId}/return` , data)
    return res.data

}