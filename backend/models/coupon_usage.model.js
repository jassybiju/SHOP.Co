import mongoose from "mongoose";

const couponUsageSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    coupon_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Coupon',
        required : true
    },
    order_id : {
        type : String,
        ref : "Order",
        required : true
    }
}, {
    timestamps : true
})

export const CouponUsage = mongoose.model('CouponUsage',couponUsageSchema)