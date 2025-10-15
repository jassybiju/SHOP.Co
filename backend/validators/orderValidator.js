import Joi from "joi";
import { validator } from "./validator.js";

const placeOrderSchema = Joi.object({
    shipping_address_id: Joi.string()
        .required()
        .messages({ "any.required": "Shipping address is required" }),

    payment_method: Joi.string()
        .valid("COD", "ONLINE")
        .required()
        .messages({
            "any.only": "Payment method must be COD or ONLINE",
            "any.required": "Payment method is required",
        }),

    order_items: Joi.array()
        .items(
            Joi.object({
                variant_id: Joi.string()
                    .required()
                    .messages({ "any.required": "Variant ID is required" }),
                quantity: Joi.number()
                    .min(1)
                    .required()
                    .messages({ "number.min": "Quantity must be at least 1" }),
            })
        )
        .min(1)
        .required()
        .messages({ "array.min": "Order must have at least 1 item" }),
});
 const orderSearchSchema = Joi.object({
    q: Joi.string().trim().min(0).max(200),
    sort: Joi.string().valid("createdAt").default("createdAt"), // TODO add valids
    order: Joi.string().valid("asc", "desc").insensitive().default("desc"),
    status: Joi.string()
        .valid(
            "PLACED",
            "CONFIRMED",
            "PACKED",
            "SHIPPED",
            "DELIVERED",
            "CANCELLED",
            "RETURNED",
            "REFUNDED",
            "all"
        )
        .insensitive()
        .default("all"),
});

const orderStatusSchema = Joi.object({
    status : Joi.string().valid(
                        "PLACED",
                        "CONFIRMED",
                        "PACKED",
                        "SHIPPED",
                        "DELIVERED",
                        "CANCELLED",
                        "RETURNED",
                        "CANCELLATION_REQUESTED",
                        "CANCELLATION_DENIED",
 "RETURN_REQUESTED",
                        "RETURN_DENIED"
                    ).required(),
    description : Joi.string().default("none")
})

const orderCancellationSchema = Joi.object({
    reason : Joi.string()
})

export const orderStatusValidator = validator(orderStatusSchema)
export const orderSearchValidator = validator(orderSearchSchema)
export const placeOrderValidator = validator(placeOrderSchema);
