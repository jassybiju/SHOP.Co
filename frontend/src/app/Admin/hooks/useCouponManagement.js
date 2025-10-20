import { useMutation, useQuery } from "@tanstack/react-query"
import { addCouponService, getAllCouponService, getCouponService, validateCouponService } from "../services/couponManagement.service"

export const useAddCoupon = () => {
    return useMutation({
        mutationFn : addCouponService
    })
}

export const useGetAllCoupons = () => {
    return useQuery({
        queryKey : ['coupon'],
        queryFn : getAllCouponService
    })
}

export const useGetCouponById = (id) => {
    return useQuery({
        queryKey : ['coupon', id],
        queryFn : () => getCouponService(id)
    })
}

export const useValidateCoupon = () => {
    return useMutation({
        mutationFn : validateCouponService
    })
}