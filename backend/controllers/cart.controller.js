import { cartValidator } from "../validators/cartValidator.js";
import {
    removeCartService,
    updateCartService,
} from "../services/cart.service.js";
import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";
import cloudinary from "../utils/cloudinary.js";
export const updateCartController = async (req, res, next) => {
    try {
        const currentUser = req.email;
        const { value, error } = cartValidator(req.body);
        if (error) throw error;

        const result = await updateCartService(currentUser, value);
        res.json({data: result, message : "Cart Updated Successfully", status : "success" });
    } catch (error) {
        next(error);
    }
};

export const removeCartController = async (req, res, next) => {
    try {
        const currentUser = req.email;

        const { id } = req.params;

        const result = await removeCartService(currentUser, id);
        res.json({ result });
    } catch (error) {
        next(error);
    }
};

export const getAllCartController = async (req, res, next) => {
    try {
        const currentUser = req.email;
        const user = await User.findOne({ email: currentUser });

        const cartItems = await Cart.find({ user_id: user._id })
            .populate({
                path: "variant_id",
                populate: {
                    path: "product_id",
                    populate: {
                        path: "category_id",
                        select: "is_active",
                    },
                    select: "is_active images name price",
                },
                select: "color size stock ",
            })
            .lean();

        const simplifiedCartItems = cartItems.map((x) => {
            const variant = x.variant_id;
            const product = variant.product_id;
            const category = product.category_id;

            const isActive =  product.is_active && category.is_active;

            return {
                _id: x._id,
                variant_id: variant._id,
                product_id: product._id,
                name : product.name,
                color: variant.color,
                price : product.price,
                discount : product.discount,
                size: variant.size,
                stock: variant.stock,
                is_active: isActive,
                image: cloudinary.url(product.images?.[0]?.url || null, {
                    secure: true,
                }),
                quantity: x.quantity,
            };
        });
        return res
            .status(200)
            .json({
                message: "Cart Items recieved Successfully",
                data: simplifiedCartItems,
                status: "success",
            });
    } catch (error) {
        next(error);
    }
};
