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
import { Transaction } from "../../models/transaction.model.js";
import { razorpay } from "../../config/razorpay.js";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import { Wallet } from "../../models/wallet.model.js";
import { toFixedNum } from "../../utils/toFixedNum.js";

export const createOrderService = async (currentUser, orderData) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const user = await User.findOne({ email: currentUser }).session(session);
		if (!user) {
			throw new Error("Unauthorized");
		}
		let coupon = null;
		// * coupon validations
		if (orderData.coupon_code && orderData.coupon_code.length > 1) {
			coupon = await Coupon.findOne({ code: orderData.coupon_code });
			if (!coupon) throw new ErrorWithStatus("Coupon not found", HTTP_RES.NOT_FOUND);
			if (coupon.expiry_date < new Date()) throw new ErrorWithStatus("Coupon Expired", HTTP_RES.BAD_REQUEST);
			if (coupon.for_user && !user._id.equals(coupon.for_user)) throw new ErrorWithStatus("User Not authorized to use the coupon", HTTP_RES.UNAUTHORIZED);
			const couponUsageCount = await CouponUsage.find({ coupon_id: coupon._id }).countDocuments();
            console.log(couponUsageCount , 44565)
			const userCouponUsage = await CouponUsage.find({ coupon_id: coupon._id, user_id: user._id }).countDocuments();
			if (couponUsageCount >= coupon.usage_limit) throw new ErrorWithStatus("Coupon can't be used", HTTP_RES.UNPROCESSABLE_ENTITY);
			// ! TODO UNCOMMENT
			// if (userCouponUsage !== 0) throw new ErrorWithStatus("Coupon Already Used by user", HTTP_RES.CONFLICT);
		}
		// * creating new order
		const order = new Order({
			payment_method: orderData.payment_method,
			shipping_address_id: orderData.shipping_address_id,
			coupon_id: coupon?._id,
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
						payment_status: "PENDING",
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

		// * calculating total
		order.delivery_fee = 15;

		let payable_amount = toFixedNum(total_amount);
        console.log(payable_amount)
		if (coupon) {
			const discountValue = Math.min(total_amount * (coupon?.discount_percentage / 100), coupon?.max_discount_amount);
			payable_amount -= toFixedNum(discountValue);
		}
        console.log(payable_amount)
		order.total_amount = toFixedNum(payable_amount + order.delivery_fee);

		order.status_history = [{ status: "PLACED", description: "none" }];

		// * saving coupon usage instance
		if (coupon) {
			await CouponUsage.create([{ user_id: user._id, coupon_id: coupon._id, order_id: order._id }], { session });
		}
		// TODO :  PENDING : MAKE THE SAME FOR COD AND WALLET
		let razorpay_order = null;
		let transaction = null;
		console.log(order.total_amount, 778);
		if (orderData.payment_method === "RAZORPAY") {
			const razorpay_option = {
				amount: order.total_amount * 100,
				currency: "INR",
				receipt: order._id,
			};
			razorpay_order = await razorpay.orders.create(razorpay_option);

			transaction = await Transaction.create(
				[
					{
						user_id: user._id,
						order_id: order._id,
						type: "debit",
						amount: order.total_amount,
						status: "PENDING",
						razorpay_order_id: razorpay_order.id,
						description: `Payment initiated for ${order._id}`,
					},
				],
				{ session }
			);
		} else if (orderData.payment_method === "WALLET") {
			const wallet = await Wallet.findOne({ user_id: user._id });
			if (wallet.balance < order.total_amount) throw new ErrorWithStatus("Insufficient Balance", HTTP_RES.BAD_REQUEST);

			wallet.balance -= order.total_amount;
			transaction = await Transaction.create(
				[
					{
						user_id: user._id,
						order_id: order._id,
						type: "debit",
						amount: order.total_amount,
						status: "SUCCESS",
						description: "Payment done through wallet for " + order._id,
					},
				],
				{ session }
			);

			await wallet.save({ session });
			order.payment_status = "PAID";
		}

		console.log(transaction, 121);
		order.transaction_id = transaction?.[0]?._id;

		await order.save({ session });

		await session.commitTransaction();
		if (razorpay_order) return { order, razorpay_order };
		return { order };
	} catch (error) {
		await session.abortTransaction();
		console.log(error);
		throw error;
	} finally {
		session.endSession();
	}
};
