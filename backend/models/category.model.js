import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : [true , "Brand name is required"]
    },
    description : {
        type : String,
        requried : [true, "Description is required"]
    },
    is_active : {
        type : Boolean, 
        default : true
    }
     
},{
    timestamps : true
})

export const Category = mongoose.model("Category", categorySchema)