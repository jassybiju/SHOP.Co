import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
        },
        color: {
            type: String,
        },
        size: {
            type: String,
            enum: ["S", "M", "L", "XL"],
        },
        stock: {
            type: Number,
            default: 0,
            min: 0,
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

export const ProductVariant = mongoose.model(
    "ProductVariant",
    productVariantSchema
);
