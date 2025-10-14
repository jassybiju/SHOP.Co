import mongoose from "mongoose";
import { nanoid } from "nanoid";
const orderSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => "ORD-" + nanoid(9).toUpperCase(),
        },
        user_id: {
            ref: "User",
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        coupon_id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        total_amount: {
            default: 0,
            min: 0,
            type: Number,
        },
        delivery_fee: {
            default: 0,
            min: 0,
            type: Number,
        },
        payment_method: {
            type: String,
            enum: ["COD", "ONLINE"],
            required: true,
        },
        payment_status: {
            type: String,
            enum: [
                "PAID",
                "PROCESSING",
                "FAILED",
                "REFUNDED",
                "CANCELLED",
                "PENDING",
            ],
            default: "PENDING",
        },
        transaction_id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        shipping_address_id: {
            ref: "Address",
            required: true,
            type: mongoose.Schema.Types.ObjectId,
        },
        // status : {
        //     type : String,
        //     enum : ['PLACED', 'CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED', "CANCELLED", "RETURNED", "REFUNDED"]

        // },
     
        status_history: [
            {
                status: {
                    type: String,
                    enum: [
                        "PLACED",
                        "CONFIRMED",
                        "PACKED",
                        "SHIPPED",
                        "DELIVERED",
                        "CANCELLED",
                        "RETURNED",
                        "CANCELLATION_REQUESTED",
                        "CANCELLATION_DENIED",
                        "RETURN_REQUESTED",
                        "RETURN_DENIED"
                    ],
                },
                changed_at: {
                    type: Date,
                    default: Date.now,
                },
                description: {
                    type: String,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Order = mongoose.model("Order", orderSchema);
