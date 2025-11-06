import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addCouponService, editCouponService, getAllCouponService, getCouponService, toggleCouponService, validateCouponService } from "../services/couponManagement.service"
import toast from "react-hot-toast"

export const useAddCoupon = () => {
    return useMutation({
        mutationFn : addCouponService
    })
}

export const useGetAllCoupons = (params) => {
    return useQuery({
        queryKey : ['coupon',params],
        queryFn : ()=>getAllCouponService(params),
        placeholderData : keepPreviousData
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

export const useEditCoupon = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : editCouponService,
        onSuccess : ()=> queryClient.invalidateQueries(['coupon'])
    })
}

export const useToggleCoupon = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : toggleCouponService ,
        onSuccess : ()=>{
            console.log(123)
            toast.success("Coupon toggled successfully")
            queryClient.invalidateQueries(['coupon'])}
    })
}