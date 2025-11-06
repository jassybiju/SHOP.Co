import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    is_primary : {
        type : Boolean , 
        default : false,
    },
    first_name : {
        type : String,
        required : true,
    },
    last_name : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    place : {
        type : String,
        required : true
    },
    pincode : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    address_type : {
        type : String ,
        required : true
    },
    landmark : {
        type : String,
    }
})

export const Address =  mongoose.model("Address", addressSchema)