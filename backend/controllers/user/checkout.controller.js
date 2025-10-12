import { Cart } from "../../models/cart.model.js";
import { User } from "../../models/user.model.js";
import { Address } from "../../models/address.model.js";
import cloudinary from "../../utils/cloudinary.js";

export const checkoutController = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.email });

        if (!user) throw new Error("Unauthorized User");

        const cart = await Cart.find({ user_id: user._id }).populate({
            path: "variant_id",
            populate: {
                path: "product_id",
                populate: {
                    path: "category_id",
                    select: "is_active",
                },
                select: "is_active name images price discount",
            },
            select: "color size stock",
        });

        if (!cart || cart.length === 0) {
            throw new Error("Cart is empty");
        }

        console.log(cart);
        const simplifiedCart = cart.map((x) => {
            const variant = x.variant_id;
            const product = variant.product_id;
            const category = product.category_id;
            console.log(category);
            const isActive = product.is_active && category.is_active;

            return {
                _id: x._id,
                variant_id: variant._id,
                product_id: product._id,
                name: product.name,
                color: variant.color,
                price: product.price,

                discount: product.discount,
                size: variant.size,
                stock: variant.stock,
                is_active: isActive,
                image: cloudinary.url(product.images?.[0]?.url || null, {
                    secure: true,
                }),
                quantity: x.quantity,
            };
        });
        if (simplifiedCart.find((x) => !x.is_active || x.quantity > x.stock)) {
            throw new Error("Cart includes unavailable or blocked items");
        }
        const subtotal = simplifiedCart.reduce(
            (acc, cur) => (cur.price * cur.quantity) + acc,
            0
        );

        const discountApplied = simplifiedCart.reduce((acc , cur) =>acc+(cur.price * (cur.discount / 100) ) * cur.quantity, 0)
        const discountedAmount = subtotal - discountApplied


        const delivery_fee = 15;
        const total = discountedAmount + delivery_fee;
        console.log(subtotal, discountedAmount, total);
        const address = await Address.find({ user_id: user._id });
        return res
            .status(200)
            .json({
                message: "Checkout created Successfully",
                status: "success",
                data: {
                    cart: simplifiedCart,
                    address: address,
                    subtotal,
                    discountApplied,
                    discountedAmount,
                    delivery_fee,
                    total,
                },
            });
    } catch (error) {
        next(error);
    }
};
