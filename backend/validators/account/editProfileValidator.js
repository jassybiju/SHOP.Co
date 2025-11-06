import Joi from "joi";
import { validator } from "../validator.js";


const namePattern = /^[A-Za-z\s]+$/; // only letters and spaces


const editProfileSchema = Joi.object({  first_name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .pattern(namePattern)
        .required()
        .messages({
            "string.empty": "First name is required",
            "string.min": "First name must be at least {#limit} characters",
            'string.pattern.base' :"Invalid First name"
         }),
    last_name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .pattern(namePattern)
        .required()
        .messages({
            "string.empty": "Second name is required",
            "string.min": "Second name must be at least {#limit} characters",
            'string.pattern.base' : "Invalid Second name"
        }),
    phone: Joi.string()
        .pattern(/^[0-9]{7,15}$/) // digits only, 7–15 digits (adjust to your rule)
        .required()
        .messages({
            "string.empty": "Phone number is required",
            "string.pattern.base":
                "Phone must contain only digits (7–15 digits)",
        }),
    image : Joi.any()
    })

export const editProfileValidator = validator(editProfileSchema)