import Joi from 'joi';
import { validator } from './validator.js';


const cartSchema = Joi.object({
    variant_id: Joi.string()
        .required()
        .messages({
            'string.empty': 'Variant ID is required',
            'any.required': 'Variant ID is required',
        }),
    quantity: Joi.number()
        .integer()
        .min(1)
        .max(5)
        .required()
        .messages({
            'number.base': 'Quantity must be a number',
            'number.integer': 'Quantity must be an integer',
            'number.min': 'Quantity must be at least {#limit}',
            'number.max': 'Quantity cannot exceed {#limit}',
            'any.required': 'Quantity is required',
        }),
});

export const cartValidator = validator(cartSchema)