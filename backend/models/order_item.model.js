import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    order_id: {
        type: String,
        ref: "Order",
        required: true,
    },
    variant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant",
        required: true,
    },
    quantity: {
        type : Number,
        min : 1,
        required : true
    },
    price: {
        type : mongoose.Decimal128,
        min: 0,
        required : true
    },
    discount: {
        type : Number,
        min: 0,
        max : 100,
        required : true
    }

});

export const OrderItem = mongoose.model("OrderItem", orderItemSchema)