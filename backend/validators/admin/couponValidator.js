import Joi from "joi";
import { validator } from "../validator.js";
const couponSchema = Joi.object({
    code: Joi.string().allow(null).empty('').optional().alphanum().min(7).max(9).uppercase().messages({
        "string.min": "Coupon code must be at least 7 characters long",
        "string.max": "Coupon code must be at most 9 characters",
    }),
    name: Joi.string()
        .min(2)
        .max(50)
        .messages({
            "string.min": "Coupon Name should be greater than 2 chars",
            "string.max": "Coupon Name should be less than 50 chars",
        }),
    description: Joi.string()
        .min(2)
        .max(150)
        .messages({
            "string.min": "Coupon Description should be greater than 2 chars",
            "string.max": "Coupon Description should be less than 150 chars",
        }),
    discount_percentage: Joi.number()
        .required()
        .min(1)
        .max(100)
        .precision(2)
        .messages({
            "number.base": "Discount Percentage must be a number.",
            "number.min": "Discount Percentage must be 0 or more.",
            "number.max": "Discount Percentage cannot exceed 100.",
            "any.required": "Discount Percentage is required.",
        }),
    max_discount_amount: Joi.number().min(0).required().messages({
        "number.base": "Max Discount Amount must be a number.",
        "number.min": "Max Discount Amount must be 0 or more.",
        "any.required": "Max Discount Amount is required.",
    }),
    min_order_amount: Joi.number().min(0).required().messages({
        "number.base": "Minimum Order Amount must be a number.",
        "number.min": "Minimum Order Amount must be 0 or more.",
        "any.required": "Minimum Order Amount is required.",
    }),
    expiry_date: Joi.date()
        .greater("now")
        .required()
        .custom((value) => {
            const date = new Date(value);
            console.log(date,)
            return date;
        })
        .messages({
            "date.base": "Expiry Date must be a valid date.",
            "date.greater":
                "Expiry Date must be in the future (tomorrow or later).",
            "any.required": "Expiry Date is required.",
        }),

    for_user: Joi.string()
       .allow(null)
        .empty('')
        .strip()     // Removes the key if null, empty string, or undefined.
         .optional()  // Ensures Joi treats it as not required
        .pattern(/^[0-9a-fA-F]{24}$/) // Value MUST be a valid ObjectId format if present
        .messages({
            'string.pattern.base': 'User ID must be a valid 24-character hexadecimal ObjectId.',
        }),
    usage_limit: Joi.number()
        .integer()
        .required()
        .when("for_user", {
            is: Joi.exist(),
            then: Joi.number()
                .valid(1)
                .messages({
                    "any.only": "Usage limit must be 1 for specific user",
                }),
            otherwise: Joi.number().min(1).messages({
                "number.min":
                    "Usage limit must be 1 or more for general coupons.",
            }),
        }),
});

export const couponValidator = validator(couponSchema);
