import Joi from "joi";
import { validator } from "./validator.js";

const namePattern = /^[A-Za-z\s]+$/; // only letters and spaces

const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_#^])[A-Za-z\d@$!%*?&\-_#^]{8,}$/;

const userSchema = Joi.object({
    first_name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .pattern(namePattern)
        .required()
        .messages({
            "string.empty": "First name is required",
            "string.min": "First name must be at least {#limit} characters",
            "string.pattern.base": "Invalid First name",
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
            "string.pattern.base": "Invalid Second name",
        }),
    phone: Joi.string()
        .pattern(/^[0-9]{7,15}$/) // digits only, 7–15 digits (adjust to your rule)
        .required()
        .messages({
            "string.empty": "Phone number is required",
            "string.pattern.base":
                "Phone must contain only digits (7–15 digits)",
        }),

    email: Joi.string()
        .trim()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Email must be a valid email address",
        }),

    password: Joi.string().pattern(passwordPattern).required().messages({
        "string.empty": "Password is required",
        "string.pattern.base":
            "Password must be at least 8 characters and include uppercase, lowercase, number and special character",
    }),
    gender: Joi.string().valid("male", "female", "other").required(),
    confirm_password: Joi.any().valid(Joi.ref("password")).required().messages({
        "any.only": "Confirm password does not match password",
        "any.required": "Confirm password is required",
    }),
}).options({ abortEarly: false });

const emailSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Email must be a valid email address",
        }),
});

const changePasswordSchema = Joi.object({
    old_password: Joi.string().required().messages({
        "string.empty": "Old Password is required",
      
    }),
    password: Joi.string().pattern(passwordPattern).required().messages({
        "string.empty": "Password is required",
        "string.pattern.base":
            "Password mus be at least 8 characters and include uppercase, lowercase, number and special character",
    }),
    confirm_password: Joi.any().valid(Joi.ref("password")).required().messages({
        "any.only": "Confirm password does not match password",
        "any.required": "Confirm password is required",
    }),
});

export const emailValidator = validator(emailSchema);
export const changePasswordValidator = validator(changePasswordSchema)
export const userValidator = validator(userSchema);
