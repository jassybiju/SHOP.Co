import { Cart } from "../../models/cart.model.js";
import { User } from "../../models/user.model.js";
import { Address } from "../../models/address.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { ProductVariant } from "../../models/product_variants.model.js";
import { toFixedNum } from "../../utils/toFixedNum.js";
import { Coupon } from "../../models/coupon.model.js";

export const checkoutController = async (req, res, next) => {
	try {
		const user = req.user;
		// const buyNow = req.params?.buyNow

		const { variant_id = "", quantity = 0, buyNow = false } = req.query || {};
		console.log(332, variant_id, quantity, req.body, buyNow === "true", buyNow !== "true");
		if (!user) throw new Error("Unauthorized User");

		let checkoutOutItems;
		if (buyNow !== "true") {
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

		if (checkoutOutItems.find((x) => !x.is_active || x.quantity > x.stock)) {
            console.log(checkoutOutItems,445)
			throw new Error("Includes unavailable or blocked items or out of stock");
		}
		const subtotal = checkoutOutItems.reduce((acc, cur) => cur.price * cur.quantity + acc, 0).toFixed(2);

		const discountApplied = checkoutOutItems.reduce((acc, cur) => acc + cur.price * (cur.discount / 100) * cur.quantity, 0).toFixed(2);
		const discountedAmount = toFixedNum(subtotal - discountApplied);
		const discountAppliedInPercentage = toFixedNum((discountApplied / subtotal) * 100);
		const delivery_fee = 15;
		const total = Number(discountedAmount) + delivery_fee;
		console.log(subtotal, discountedAmount, discountApplied, total);
		const address = await Address.find({ user_id: user._id });
		console.log(discountedAmount, discountApplied, discountAppliedInPercentage);

		const availableCoupons = await Coupon.find({ $and: [{ $or: [{ for_user: null }, { for_user: user._id }] } ,{  min_order_amount : {$lte : total} },{expiry_date : {$gt : new Date()}}]});
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
				discountAppliedInPercentage,
				total,
				availableCoupons,
			},
		});
	} catch (error) {
		next(error);
	}
};
