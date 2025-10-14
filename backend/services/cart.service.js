import mongoose from "mongoose";
import { Cart } from "../models/cart.model.js";
import { ProductVariant } from "../models/product_variants.model.js";
import { User } from "../models/user.model.js";

export const updateCartService = async (
    currentUser,
    { variant_id, quantity }
) => {
    console.log(quantity , variant_id , 123)
    const variant = await ProductVariant.findOne({ _id: variant_id }).populate({
        path: "product_id",
        populate: { path: "category_id", model: "Category" },
    });

    if (
        !variant||
        !variant.product_id.is_active ||
        !variant.product_id.category_id.is_active 
    ) {
        throw new Error("Invalid request");
    }


    const user = await User.findOne({ email: currentUser });

    const existingVariantInCart = await Cart.findOne({
        user_id: user._id,
        variant_id: variant_id,
    });

    if (!existingVariantInCart && quantity > 0 ) {
        console.log(variant.stock , quantity , variant.stock >= quantity)
        if(variant.stock < quantity) throw new Error("Insufficient Quanitty")
        console.log("xfsf");
        const cart = await Cart.create({
            quantity,
            variant_id,
            user_id: user._id,
        });
        return cart;
    }
    console.log(existingVariantInCart, 998)
    if (variant.stock < existingVariantInCart.quantity + quantity) {
        throw new Error("Invalid Request : Insufficient stock");
    }
    if(!existingVariantInCart && quantity < 0){
        throw new Error("Invalid request")
    }


    if (existingVariantInCart.quantity + quantity > 5) {
        throw new Error("Max Items in cart");
    }

    if (existingVariantInCart.quantity + quantity <= 0) {
        await Cart.deleteOne({ _id: existingVariantInCart._id });
        return {};
    }else{
        existingVariantInCart.quantity = existingVariantInCart.quantity + quantity;
        await existingVariantInCart.save();

    }

    return existingVariantInCart;
};

export const removeCartService = async (
    currentUser,
    cart_id
) => {
    if(!mongoose.Types.ObjectId.isValid(cart_id)  ) throw new Error("Cart Id is inValid")
    const cart = await Cart.findOne({ _id: cart_id });
    const user = await User.findOne({email :currentUser})
    console.log(cart.user_id , user._id)
    if(!cart.user_id.equals(user._id)){
        throw new Error("Invalid request")
    }

    await Cart.findOneAndDelete({ _id : cart_id})

    return cart;
};
