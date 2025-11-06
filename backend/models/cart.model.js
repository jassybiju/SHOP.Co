import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    variant_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ProductVariant',
        required : true
    },
    quantity : {
        type : Number,
        required  : true,
        min : 1
    }
},{
    timestamps : true
})

export const Cart = mongoose.model("Cart", cartSchema)