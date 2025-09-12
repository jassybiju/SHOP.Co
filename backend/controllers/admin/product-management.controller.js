import { Product } from "../../models/product.model.js";
import { productValidator } from "../../validators/productValidator.js";
import { generateSKU } from "../../utils/generateSKU.js";
import { ProductVariant } from "../../models/product_variants.model.js";
import mongoose from "mongoose";

export const addProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { value, error } = productValidator(req.body);
        if (error) {
            res.status(400);
            throw error;
        }
        const { variants, ...product } = value;
        const existingProduct = await Product.findOne({
            name: product.name,
        }).session(session);
        if (existingProduct) {
            res.status(400);

            throw new Error("Product Name Already Exists");
        }
        console.log(product);
        const newProduct = await Product.create([product], {
            session: session,
        });
        const variantResult = [];
        for (const { size, color, stock } of variants) {
            const sku = generateSKU(newProduct[0]._id, size, color);
            const existingSKU = await ProductVariant.findOne({ sku }).session(
                session
            );
            if (existingSKU) {
                res.status(400);

                throw new Error("Variant already exists");
            }
            const newSku = await ProductVariant.create({
                product_id: newProduct[0]._id,
                sku,
                size,
                color,
                stock,
            });
            variantResult.push(newSku);
        }

        console.log(
            {
                product: {
                    ...newProduct[0],
                    variants: variantResult,
                    sdf: 2343,
                },
            },
            3424
        );

        res.status(201).json({
            message: "Product Created Succesfully",
            data: { ...newProduct[0]._doc, variants: variantResult },
            status: "success",
        });
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
};
