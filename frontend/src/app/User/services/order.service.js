import { orderAxiosInstance } from "@/lib/axios";

export const placeOrder = async (data) => {
    console.log(data);
    const res = await orderAxiosInstance.post("", data);
    return res.data;
};

export const getAllOrder = async (data) => {
    const res = await orderAxiosInstance.get("", { params: data.queryKey[1] });
    return res.data;
};
export const getOrder = async (id) => {
    const res = await orderAxiosInstance.get("/"+id, )
    return res.data;
};
export const cancelOrder = async ({ id, data }) => {
    const res = await orderAxiosInstance.patch(
        "request-cancellation/" + id,
        data
    );
    return res.data;
};

export const cancelOrderItem = async({id ,itemId, data}) => {
    const res = await orderAxiosInstance.patch(`${id}/${itemId}/cancel`,data)
    return res.data
}
export const returnOrderItem = async({id ,itemId, data}) => {
    const res = await orderAxiosInstance.patch(`${id}/${itemId}/return`,data)
    return res.data
}
export const returnOrder = async ({ id, data }) => {
    const res = await orderAxiosInstance.patch("request-return/" + id, data);
    return res.data;
};
