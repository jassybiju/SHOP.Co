import Joi from 'joi'
import { validator } from './validator.js'
const categorySchema = Joi.object({
    name : Joi.string().min(3).required(),
    description : Joi.string().min(5).required(),
    discount : Joi.number().min(0).max(100).default(0)
})


export const categoryValidator = validator(categorySchema)