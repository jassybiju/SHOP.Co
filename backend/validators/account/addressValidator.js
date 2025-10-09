import Joi from "joi";
import { validator } from "../validator.js";


const namePattern = /^[A-Za-z\s]+$/; // only letters and spaces

export const addressSchema = Joi.object({
  first_name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(namePattern)
    .required()
    .messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least {#limit} characters",
      "string.pattern.base": "Invalid first name (letters only)",
    }),

  last_name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(namePattern)
    .required()
    .messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least {#limit} characters",
      "string.pattern.base": "Invalid last name (letters only)",
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{7,15}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone must be 7–15 digits only",
    }),

  address: Joi.string()
    .trim()
    .min(5)
    .max(200)
    .required()
    .messages({
      "string.empty": "Address is required",
      "string.min": "Address must be at least {#limit} characters",
    }),

  place: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Place is required",
      "string.min": "Place must be at least {#limit} characters",
    }),

  state: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "State is required",
      "string.min": "State must be at least {#limit} characters",
    }),

  address_type: Joi.string()
    .required()
    .messages({

      "string.empty": "Address type is required",
    }),

  landmark: Joi.string()
    .allow("")
    .max(100)
    .messages({
      "string.max": "Landmark must be at most {#limit} characters",
    }),
  pincode: Joi.string()
    .pattern(/^[0-9]{5,6}$/)
    .required()
    .messages({
      "string.empty": "Pincode is required",
      "string.pattern.base": "Pincode must be 6 digits only",
    }),  // user_id will be validated separately (from auth or route param)
});


export const addressValidator = validator(addressSchema)
