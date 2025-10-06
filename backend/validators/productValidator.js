import Joi from "joi";
import { validator } from "./validator.js";
const productVariantValidator = Joi.object({
    color : Joi.string().required(),
    stock : Joi.number().optional().default(0),
    size :  Joi.string().valid('S','M','L','XL').required(),
}).unknown(true)

const productSchema = Joi.object({
    name : Joi.string().min(3).required(),
    small_description : Joi.string().min(3).required(),
    description : Joi.string().min(100).required(),
    discount : Joi.number().min(0).max(100).optional().default(0),
    brand_id : Joi.string().required(),
    category_id : Joi.string().required(),
    price : Joi.number().min(0).required(),
    variants : Joi.array().items(productVariantValidator).min(1).required(),
    images : Joi.any().strip(),
    imagesData : Joi.any()
})



export const productValidator = validator(productSchema)