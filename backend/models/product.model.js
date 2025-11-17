import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name required"],
    },
    small_description: {
        type: String,
        required: [true, "Small Description Required"],
    },
    description: {
        type: String,
        required: [true, "Description Required"],
    },
    discount: {
        type: Number,
        default: 0,
    },
    brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    price : {
        type : Number,
        min : 0,
        required : [true, "Price is required"]
    },
    is_active : {
        type : Boolean,
        default :true
    },
    images : [{
        url : {
            type : String,
            required : true
        },
        is_main : {
            type : Boolean ,
            default : false
        }
    }]

},{
    timestamps : true
});


export const Product = mongoose.model('Product', productSchema)