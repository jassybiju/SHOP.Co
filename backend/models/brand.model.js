import express from 'express'
import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema({
    name : {
        type : String,
        unique :true,
        required : [true , "Brand name is required"]
    },
    description : {
        type : String,
        requried : [true, "Description is required"]
    },
    image : {
        type : String,
        required : true,
    },
    is_active : {
        type : Boolean ,
        default : true
    }
},{
    timestamps : true
})

export const Brand = mongoose.model("Brand", brandSchema)