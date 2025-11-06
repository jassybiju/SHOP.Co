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
    },
    is_cancelled : {
        type : Boolean,
        default : false
    },
    is_returned : {
        type : Boolean,
        default : false
    },
    status : {
        enum : ['DELIVERED', "RETURN_REQUESTED", "RETURN_DENIED","RETURNED","PLACED",'CANCELLED'],
        type : String,
        default : "PLACED"
    },
    return_reason : {
        type : String, default : null
    }
},{
    timestamps : true
});

export const OrderItem = mongoose.model("OrderItem", orderItemSchema)