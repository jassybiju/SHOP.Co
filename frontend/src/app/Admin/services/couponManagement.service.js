import { adminAxiosInstance } from "@/lib/axios"


export const addCouponService = async(data) => {
    const res  = await adminAxiosInstance.post('/coupon',data)

    return res.data
}

export const getAllCouponService = async() => {
    const res = await adminAxiosInstance.get('/coupon')
    return res.data
}

export const getCouponService = async (id) => {
    const res = await adminAxiosInstance.get('/coupon/'+id)
    return res.data
}

export const validateCouponService = async({code , cartTotal}) => {
    const res = await adminAxiosInstance.post('/coupon/validate', {code : code , cartTotal : cartTotal})
    return res.data
}