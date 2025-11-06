import Joi from "joi";
import { validator } from "./validator.js";

const searchSchema = Joi.object({
    q: Joi.string().trim().min(0).max(200),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    sort: Joi.string().valid("name", "price", "createdAt").default("createdAt"), // TODO add valids
    order: Joi.string().valid("asc", "desc").insensitive().default("asc"),
    category: Joi.alternatives().try(
        Joi.array().items(Joi.string().trim().min(1)),
        Joi.string().trim()
    ),
    brand: Joi.alternatives().try(
        Joi.array().items(Joi.string().trim().min(1)),
        Joi.string().trim()
    ),
    color : Joi.any(),
    price_min: Joi.number().min(0).default(0),
    price_max: Joi.number().min(Joi.ref("price_min")).default(Number.MAX_SAFE_INTEGER),
    size: Joi.alternatives().try(
        Joi.array().items(Joi.string().trim().min(1)),
        Joi.string().trim()
    ),
});

export const searchValidator = validator(searchSchema);
