import { cartValidator } from "../validators/cartValidator.js";
import {
    removeCartService,
    updateCartService,
} from "../services/cart.service.js";
import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";
import cloudinary from "../utils/cloudinary.js";
import { toFixedNum } from "../utils/toFixedNum.js";
export const  updateCartController = async (req, res, next) => {
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
                        select: "is_active discount",
                    },
                    select: "is_active images name price discount",
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
                discount : product.discount < category.discount ? category.discount : product.discount,
                size: variant.size,
                stock: variant.stock,

                is_active: isActive,
                image: cloudinary.url(product.images?.[0]?.url || null, {
                    secure: true,
                }),
                quantity: x.quantity,
            };
        });

        const subtotal = toFixedNum( simplifiedCartItems.reduce((acc,cur) => (cur.price * cur.quantity) + acc , 0 ))

        const discountApplied = toFixedNum(simplifiedCartItems.reduce((acc, cur)=>{console.log(acc);return acc +( (cur.price * (cur.discount / 100)) * cur.quantity)}, 0))
        const discountAppliedInPercentage = toFixedNum((discountApplied / subtotal) * 100 )
        const total = subtotal - discountApplied +(simplifiedCartItems.length === 0 ? 0 : 15)
        console.log(subtotal , discountApplied , total , simplifiedCartItems , 778)
        // console.log(simplifiedCartItems)
        return res
            .status(200)
            .json({
                message: "Cart Items recieved Successfully",
                data: {cart : simplifiedCartItems , subtotal , discountApplied , total, discountAppliedInPercentage},
                status: "success",
            });
    } catch (error) {
        next(error);
    }
};
