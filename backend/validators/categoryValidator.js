import Joi from 'joi'
import { validator } from './validator.js'
const categorySchema = Joi.object({
    name : Joi.string().min(3).required(),
    description : Joi.string().min(5).required(),
})


export const categoryValidator = validator(categorySchema)