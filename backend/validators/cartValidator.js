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
        .max(5)
        .invalid(0)
        .required()
        .messages({
            'number.base': 'Quantity must be a number',
            'number.integer': 'Quantity must be an integer',
            'any.invalid': 'Quantity should not be zero',
            'any.required': 'Quantity is required',
        }),
});

const removeCartSchema = Joi.object({
        cart_id: Joi.string()
        .required()
        .messages({
            'string.empty': 'Cart ID is required',
            'any.required': 'Cart ID is required',
        }),
  
})

export const removeCartValidator = validator(removeCartSchema)
export const cartValidator = validator(cartSchema)