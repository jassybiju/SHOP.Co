    import mongoose from "mongoose";
    import { nanoid } from "nanoid";

    const couponSchema = new mongoose.Schema(
        {
            code: {
                type: String,
                default: () => nanoid(8).toUpperCase(),
                unique: true,
                required: true,
                trim: true,
            },
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            usage_limit: {
                type: Number,
                min: 1,
                default: 1,
            },
            used_count: {
                type: Number,
                default: 0,
            },
            min_order_amount: {
                type: Number,
                default: 0,
            },
            max_discount_amount: {
                type: Number,
                default: 0,
            },
            for_user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            discount_percentage: {
                type: Number,
                min: 0,
                max: 100,
                default: 0,
            },
            expiry_date: {
                type: Date,
                required: true,
            },
            is_deleted: {
                type: Boolean,
                default: false,
            },
            is_active: {
                type: Boolean,
                default: true,
            },
        },
        {
            timestamps: true,
        }
    );

    export const Coupon = mongoose.model("Coupon", couponSchema);
