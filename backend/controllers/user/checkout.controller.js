import { Cart } from "../../models/cart.model.js";
import { User } from "../../models/user.model.js";
import { Address } from "../../models/address.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { ProductVariant } from "../../models/product_variants.model.js";

export const checkoutController = async (req, res, next) => {
    try {
        const user = req.user;
        // const buyNow = req.params?.buyNow

        const {
            variant_id = "",
            quantity = 0,
            buyNow = false,
        } = req.query || {};
        console.log(332, variant_id, quantity, req.body, buyNow === 'true',buyNow !== 'true');
        if (!user) throw new Error("Unauthorized User");

        let checkoutOutItems;
        if ((buyNow !== 'true')) {
            console.log(user,77);
            const cart = await Cart.find({ user_id: user._id }).populate({
                path: "variant_id",
                populate: {
                    path: "product_id",
                    populate: {
                        path: "category_id",
                        select: "is_active discount",
                    },
                    select: "is_active name images price discount",
                },
                select: "color size stock",
            });
            if (!cart || cart.length === 0) {
                throw new Error("Cart is empty");
            }
            console.log(cart);
            checkoutOutItems = cart.map((x) => {
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
                    discount: product.discount < category.discount ? category.discount : product.discount,
                    size: variant.size,
                    stock: variant.stock,
                    is_active: isActive,
                    image: cloudinary.url(product.images?.[0]?.url || null, {
                        secure: true,
                    }),
                    quantity: x.quantity,
                };
            });
        } else {
            console.log(3352);
            const variant = await ProductVariant.findById(variant_id)
                .populate({
                    path: "product_id",
                    populate: {
                        path: "category_id",
                        select: "is_active discount",
                    },
                    select: "is_active name images price discount",
                })
                .lean();
            console.log(variant);
            if (!variant) {
                throw new Error("Invalid variant");
            }
            const product = variant.product_id;
            const category = product.category_id;
            console.log(product.is_active, category);
            checkoutOutItems = [
                {
                    _id: variant_id,
                    variant_id: variant._id,
                    product_id: product._id,
                    name: product.name,
                    color: variant.color,
                    price: product.price,

                    discount: product.discount < category.discount ? category.discount : product.discount,
                    size: variant.size,
                    stock: variant.stock,
                    is_active: product.is_active && category.is_active,
                    image: cloudinary.url(product.images?.[0]?.url || null, {
                        secure: true,
                    }),
                    quantity: quantity,
                },
            ];
        }

        if (
            checkoutOutItems.find((x) => !x.is_active || x.quantity > x.stock)
        ) {
            throw new Error("Cart includes unavailable or blocked items");
        }
        const subtotal = checkoutOutItems.reduce(
            (acc, cur) => cur.price * cur.quantity + acc,
            0
        );

        const discountApplied = checkoutOutItems.reduce(
            (acc, cur) => acc + cur.price * (cur.discount / 100) * cur.quantity,
            0
        );
        const discountedAmount = subtotal - discountApplied;

        const delivery_fee = 15;
        const total = discountedAmount + delivery_fee;
        console.log(subtotal, discountedAmount, total);
        const address = await Address.find({ user_id: user._id });
        return res.status(200).json({
            message: "Checkout created Successfully",
            status: "success",
            data: {
                cart: checkoutOutItems,
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
