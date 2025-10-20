import mongoose from "mongoose";
import { User } from "../../models/user.model.js";
import { Order } from "../../models/order.model.js";
import { ProductVariant } from "../../models/product_variants.model.js";
import { OrderItem } from "../../models/order_item.model.js";
import { Cart } from "../../models/cart.model.js";
import { Coupon } from "../../models/coupon.model.js";
import ErrorWithStatus from "../../config/ErrorWithStatus.js";
import { HTTP_RES } from "../../utils/CONSTANTS.js";
import { CouponUsage } from "../../models/coupon_usage.model.js";

export const createOrderService = async (currentUser, orderData) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const user = await User.findOne({ email: currentUser }).session(session);
		if (!user) {
			throw new Error("Unauthorized");
		}

		// * coupon validations
		const coupon = await Coupon.findOne({ code: orderData.coupon_code });
		if (!coupon) throw new ErrorWithStatus("Coupon not found", HTTP_RES.NOT_FOUND);
		if (coupon.expiry_date < new Date()) throw new ErrorWithStatus("Coupon Expired", HTTP_RES.BAD_REQUEST);
		if (coupon.for_user && user._id !== coupon.for_user) throw new ErrorWithStatus("User Not authorized to use the coupon", HTTP_RES.UNAUTHORIZED);
		const couponUsageCount = await CouponUsage.find({ coupon_id: coupon._id }).countDocuments();
		const userCouponUsage = await CouponUsage.find({ coupon_id: coupon._id, user_id: user._id }).countDocuments();
		if (couponUsageCount >= coupon.usage_limit) throw new ErrorWithStatus("Coupon can't be used", HTTP_RES.UNPROCESSABLE_ENTITY);
		if (userCouponUsage !== 0) throw new ErrorWithStatus("Coupon Already Used by user", HTTP_RES.CONFLICT);

		// * creating new order
		const order = new Order({
			payment_method: orderData.payment_method,
			shipping_address_id: orderData.shipping_address_id,
			coupon_id: coupon._id,
			user_id: user._id,
		});

		const orderItems = [];
		let total_amount = 0;
		// * creating order items
		for (const item of orderData.order_items) {
			const variant = await ProductVariant.findById(item.variant_id)
				.populate({
					path: "product_id",
					populate: {
						path: "category_id",
						select: "is_active discount",
					},
					select: "is_active name price discount",
				})
				.lean();
			const product = variant.product_id;
			const category = product.category_id;
			if (!variant || !product.is_active || !category.is_active) {
				throw new Error("Variant not available");
			}
			if (variant.stock < item.quantity) {
				throw new Error("Insufficient Quantity");
			}
			console.log(1);
			const [orderItem] = await OrderItem.create(
				[
					{
						order_id: order._id,
						variant_id: item.variant_id,
						quantity: item.quantity,
						price: product.price,
						discount: product.discount < category.discount ? category.discount : product.discount,
					},
				],
				{ session }
			);
			console.log(2);
			orderItems.push(orderItem);

			// ! removing from cart
			// TODO Should i remove the number of quantity order or the full
			// * Removing the item from cart
			await Cart.findOneAndDelete({
				user_id: user._id,
				variant_id: item.variant_id,
			});

			// * Removing the quantity from the inventory
			await ProductVariant.findByIdAndUpdate(item.variant_id, { $inc: { stock: -item.quantity } }, { session, new: true });

			total_amount += product.price * (1 - orderItem.discount / 100) * item.quantity;
			console.log(orderItems);
		}

		order.delivery_fee = 15;
		const totalAmountWithoutDiscount = total_amount + order.delivery_fee;
		order.total_amount =
			totalAmountWithoutDiscount -
			(totalAmountWithoutDiscount * (0.01 * coupon.discount_percentage) < coupon.max_discount_amount
				? totalAmountWithoutDiscount * (0.01 * coupon.discount_percentage)
				: coupon.max_discount_amount);
		order.status_history = [{ status: "PLACED", description: "none" }];
		await order.save({ session });
        console.log(user._id, coupon._id , order._id)
        await CouponUsage.create([{user_id : user._id , coupon_id : coupon._id , order_id : order._id}],{session})
		console.log(order);
		await session.commitTransaction();
		return { order, orderItems };
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};
