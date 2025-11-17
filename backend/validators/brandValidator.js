
import Joi from 'joi'
import { validator } from './validator.js'
const brandSchema = Joi.object({
    name : Joi.string().min(3).max(10).required(),
    description : Joi.string().min(5).required(),
    image: Joi.string().uri()
})


export const brandValidator = validator(brandSchema)
