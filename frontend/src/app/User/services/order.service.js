import { axiosInstance } from "@/lib/axios";

export const placeOrder = async (data) => {
    console.log(data);
    const res = await axiosInstance.post("order", data);
    return res.data;
};

export const getAllOrder = async (data) => {
    const res = await axiosInstance.get("order", { params: data.queryKey[1] });
    return res.data;
};
export const getOrder = async (id) => {
    const res = await axiosInstance.get("order/"+id, )
    return res.data;
};
export const cancelOrder = async ({ id, data }) => {
    const res = await axiosInstance.patch(
        "order/request-cancellation/" + id,
        data
    );
    return res.data;
};

export const cancelOrderItem = async({id ,itemId, data}) => {
    const res = await axiosInstance.patch(`order/${id}/${itemId}/cancel`,data)
    return res.data
}
export const returnOrderItem = async({id ,itemId, data}) => {
    const res = await axiosInstance.patch(`order/${id}/${itemId}/return`,data)
    return res.data
}
export const returnOrder = async ({ id, data }) => {
    const res = await axiosInstance.patch("order/request-return/" + id, data);
    return res.data;
};
