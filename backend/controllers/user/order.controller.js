import { User } from "../../models/user.model.js";
import { Order } from "../../models/order.model.js";
import { OrderItem } from "../../models/order_item.model.js";
import { orderSearchValidator, placeOrderValidator } from "../../validators/orderValidator.js";
import { createOrderService } from "../../services/user/order.service.js";
import cloudinary from "../../utils/cloudinary.js";
import { HTTP_RES } from "../../utils/CONSTANTS.js";
import { verifyPaymentService } from "../../utils/helpers.js";
import { Transaction } from "../../models/transaction.model.js";
import { Wallet } from "../../models/wallet.model.js";
import ErrorWithStatus from "../../config/ErrorWithStatus.js";
import { ProductVariant } from "../../models/product_variants.model.js";
import { toFixedNum } from "../../utils/toFixedNum.js";
import mongoose from "mongoose";
import { razorpay } from "../../config/razorpay.js";

export const addOrderController = async (req, res, next) => {
	try {
		console.log(req.body, 11);
		const { value, error } = placeOrderValidator(req.body);

		const currentUser = req.email;
		if (error) {
			throw error;
		}

		console.log(currentUser);
		const order = await createOrderService(currentUser, value);
		res.status(201).json({
			data: order,
			message: "Order Created Successfully",
			status: "success",
		});
	} catch (error) {
		console.log(1);
		next(error);
	}
};

export const getAllOrderController = async (req, res, next) => {
	try {
		const currentUser = req.email;
		const user = await User.findOne({ email: currentUser });
		if (!user) throw new Error("Unauthorized");

		// Validate query params
		const { value, error } = orderSearchValidator(req.query);
		if (error) throw error;

		const { q, sort, order, status, page, limit } = value;

		// Build query
		const query = { user_id: user._id };

		if (status && status.toLowerCase() !== "all") {
			query["status_history.status"] = status.toUpperCase();
		}

		if (q) {
			query["_id"] = { $regex: q, $options: "i" };
		}

		const skip = (page - 1) * limit;
		const orders = await Order.find(query)
			.sort({ [sort]: order.toLowerCase() === "asc" ? 1 : -1 })
			.skip(skip)
			.limit(limit)
			.lean();

		const totalOrders = await Order.countDocuments(query);

		const orderIds = orders.map((o) => o._id);
		const orderItems = await OrderItem.find({ order_id: { $in: orderIds } })
			.populate([
				{
					path: "variant_id",
					populate: {
						path: "product_id",
						select: "images price name",
					},
				},
			])
			.lean();

		// console.log(orderItems[1].price.toString())
		// Combine orders with their items
		const orderWithItems = orders.map((o) => ({
			...o,
			items: orderItems
				.filter((item) => item.order_id === o._id)
				.map((x) => ({
					...x,
					price: x.price.toString(),
					image: cloudinary.url(x.variant_id?.product_id?.images?.[0].url, { secure: true }),
					name: x.variant_id?.product_id?.name || null,
					size: x.variant_id?.size,
					color: x.variant_id?.color,
					// razorpay_order_id: x.transaction_id?.razorpay_order_id,
				})),
		}));

		return res.status(200).json({
			data: { data: orderWithItems, pages: Math.ceil(totalOrders / limit), page: page, limit: limit },
			message: "Orders retrieved successfully",
			status: "success",
		});
	} catch (error) {
		next(error);
	}
};

export const getOrderById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = req.user;
		const order = await Order.findOne({ _id: id, user_id: user._id })
			.populate([
				{ path: "shipping_address_id" },
				{ path: "coupon_id", select: "discount_percentage name code max_discount_amount" },
				{
					path: "transaction_id",
					select: "razorpay_order_id",
				},
			])
			.lean();

		if (!order) throw new ErrorWithStatus("Order not found", HTTP_RES.NOT_FOUND);

		const orderItems = await OrderItem.find({ order_id: order._id })
			.populate([
				{
					path: "variant_id",
					populate: { path: "product_id", select: "images name" },
                    select : "color size"
				},
			])
			.lean();

		const simplifiedOrder = {
			...order,
			items: orderItems.map((x) => {
				const variant = x.variant_id;
				const product = variant.product_id;

				return {
					...x,
					images: cloudinary.url(product.images[0].url, {
						secure: true,
					}),
					name: product.name,
					color: variant.color,
					size: variant.size,
					price: x.price.toString(),
				};
			}),
		};

		const subtotal = simplifiedOrder.items
			.filter((x) => !x.is_cancelled)
			.reduce((acc, cur) => cur.price * cur.quantity + acc, 0);
		const discountApplied = simplifiedOrder.items.reduce(
			(acc, cur) => acc + cur.price * (cur.discount / 100) * cur.quantity,
			0
		);

		let couponDiscountApplied = 0;
		console.log(order.coupon_id?.discount_percentage);
		if (order.coupon_id?.discount_percentage) {
			couponDiscountApplied = Math.min(
				((subtotal - discountApplied) * order.coupon_id.discount_percentage) / 100,
				order.coupon_id.max_discount_amount
			);
		}

		return res.status(200).json({
			data: {
				...simplifiedOrder,
				subtotal,
				discountApplied,
				couponDiscountApplied,
				razorpay_order_id: order?.transaction_id?.razorpay_order_id,
			},
			status: "success",
			message: "Order Recieved Successfully",
		});
	} catch (error) {
		next(error);
	}
};

// ! ADD TRANSACTION MONGOOSE
export const requestCancellation = async (req, res, next) => {
	try {
		const { id: orderId } = req.params;
		const { reason } = req.body;
		const user = req.user._id;

		const existingOrder = await Order.findOne({
			_id: orderId,
			user_id: user,
		});

		if (!existingOrder) {
			throw new ErrorWithStatus("Order not found", HTTP_RES.NOT_FOUND);
		}

		const currentStatus = existingOrder.status_history.slice(-1)[0].status;

		if (["SHIPPED", "DELIVERED", "CANCELLED", "RETURNED", "REFUNDED"].includes(currentStatus)) {
			throw new ErrorWithStatus(
				"Cannot request cancellation for an order currently in " + currentStatus + " status",
				HTTP_RES.BAD_REQUEST
			);
		}
		const updatedOrder = await Order.findByIdAndUpdate(
			orderId,
			{
				$push: {
					status_history: {
						status: "CANCELLED",
						description: reason,
					},
				},
				// cancelled_at : new Date()
			},

			{ new: true, runValidators: true }
		);
		console.log(updatedOrder.payment_status);
		if (updatedOrder.payment_status === "PAID") {
			console.log(123);
			const wallet = await Wallet.findOneAndUpdate(
				{ user_id: user },
				{ $inc: { balance: updatedOrder.total_amount } }
			);

			await Transaction.create({
				user_id: user._id,
				order_id: existingOrder._id,
				amount: updatedOrder.total_amount,
				type: "refund",
				status: "SUCCESS",
				reason: `Order ${existingOrder._id} cancelled`,
			});
			console.log(wallet);
		}
		updatedOrder.payment_status = "REFUNDED";
		updatedOrder.total_amount = 0;
		await updatedOrder.save();
		await OrderItem.updateMany({ order_id: updatedOrder._id }, { $set: { is_cancelled: true, status: "CANCELLED" } });
		const orderItems = await OrderItem.find({ order_id: updatedOrder._id }).lean();
		console.log(orderItems, 123);
		await Promise.all(
			orderItems?.map((x) =>
				ProductVariant.findByIdAndUpdate({ _id: x.variant_id }, { $inc: { stock: x.quantity } })
			)
		);
		return res.status(200).json({
			message: "Order updated with new Status",
			data: updatedOrder,
			status: "success",
		});
	} catch (error) {
		next(error);
	}
};

export const cancelOrderItemController = async (req, res, next) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const { id: orderId, itemId } = req.params;
		const { reason } = req.body;
		const user = req.user;

		const existingOrder = await Order.findOne({
			_id: orderId,
			user_id: user._id,
		}).populate("coupon_id");

		if (!existingOrder) throw new ErrorWithStatus("Order not found", HTTP_RES.NOT_FOUND);

		const existingOrderItem = await OrderItem.findOne({ _id: itemId, order_id: orderId, is_cancelled: false });
		if (!existingOrderItem) throw new ErrorWithStatus("Order item not found", HTTP_RES.NOT_FOUND);
		const currentStatus = existingOrder.status_history.slice(-1)[0].status;

		if (
			["PACKED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED", "REFUNDED"].includes(
				currentStatus
			)
		) {
			throw new ErrorWithStatus(
				`Cannot request cancellation for an order currently in ${currentStatus} status`
			);
		}

		//* cacelling the order item
		existingOrderItem.is_cancelled = true;
		existingOrderItem.status = "CANCELLED";
		await existingOrderItem.save({ session });

		// * restocking the quantity
		await ProductVariant.findByIdAndUpdate(
			{ _id: existingOrderItem.variant_id },
			{ $inc: { stock: existingOrderItem.quantity } },
			{ session }
		);

		// * checking remaining orderItem if it is last item cancel and order then newTotal become 0
		const orderItems = await OrderItem.find({
			order_id: orderId,
			is_cancelled: false,
			_id: { $ne: existingOrderItem._id },
		});
		let newTotal = 0;

		if (orderItems.length == 0) {
			existingOrder.status_history = [
				...existingOrder.status_history,
				{ status: "CANCELLED", description: "Order Cancelled by user , reason : " + reason },
			];
		} else {
			// throw new ErrorWithStatus("Canceling last item rather cancel the whole order", HTTP_RES.BAD_REQUEST);

			const orderSubtotal = orderItems.reduce((sum, item) => {
				const priceNum = parseFloat(item.price.toString());
				console.log(priceNum);
				return sum + priceNum * item.quantity * (1 - item.discount / 100);
			}, 0);
			// const itemTotal = existingOrderItem.price * existingOrderItem.quantity * (1 - existingOrderItem.discount / 100);
			console.log(orderSubtotal, 112);
			let couponDiscount = 0;
			if (existingOrder.coupon_id) {
				const coupon = existingOrder.coupon_id;
				if (orderSubtotal >= coupon.min_order_amount) {
					const rawDiscount = orderSubtotal * (coupon.discount_percentage / 100);
					couponDiscount = Math.min(rawDiscount, coupon.max_discount_amount);
				} else {
					existingOrder.coupon_id = null;
				}
			}
			// This is the amount of the item with coupon discount
			// NOTE : 25 % of whole order === sum of 25 %of order items
			newTotal = orderSubtotal + (existingOrder.delivery_fee || 0) - couponDiscount;
			console.log(newTotal, orderSubtotal, existingOrder.delivery_fee, couponDiscount);
		}
		console.log(newTotal);
		if (existingOrder.payment_status === "PAID") {
			const refundAmount = Math.max(0, existingOrder.total_amount - newTotal);
			console.log(refundAmount, 1110);
			if (refundAmount > 0) {
				const wallet = await Wallet.findOneAndUpdate(
					{ user_id: user._id },
					{ $inc: { balance: toFixedNum(refundAmount) } },
					{ upsert: true, new: true, session }
				);

				await Transaction.create(
					[
						{
							user_id: user._id,
							order_id: existingOrder._id,
							amount: toFixedNum(refundAmount),
							type: "refund",
							status: "SUCCESS",
							reason: `Order item cancelled from order ${existingOrder._id}`,
						},
					],
					{ session }
				);
				existingOrder.payment_status = "REFUNDED";
			}
		}
		console.log(newTotal, 112);
		if (newTotal > existingOrder.total_amount) {
			throw new ErrorWithStatus("Cant cancel this item try again or cancel whole order", HTTP_RES.BAD_REQUEST);
		}
		existingOrder.total_amount = newTotal;

		await existingOrder.save({ session });
		// const order = await OrderItem.findByIdAndUpdate(existingOrderItem._id,{is_cancelled : true},{new : true})

		await session.commitTransaction();

		return res.status(HTTP_RES.OK).json({ message: "success" });
	} catch (error) {
		await session.abortTransaction();
		next(error);
	} finally {
		session.endSession();
	}
};

export const requestReturn = async (req, res, next) => {
	try {
		const { id: orderId } = req.params;
		const { reason } = req.body;
		const user = req.user._id;
		const existingOrder = await Order.findOne({
			_id: orderId,
			user_id: user,
		});

		if (!existingOrder) {
			throw new Error("Order not found");
		}

		const currentStatus = existingOrder.status_history.slice(-1)[0].status;

		if (currentStatus !== "DELIVERED") {
			throw new Error("Cannot request a order withour being delivered");
		}

		if (currentStatus == "RETURN_REQUESTED") {
			throw new Error("A return request is already sent");
		}

		const updatedOrder = await Order.findByIdAndUpdate(
			orderId,
			{
				$push: {
					status_history: {
						status: "RETURN_REQUESTED",
						description: reason,
					},
				},
			},
			{ new: true, runValidators: true }
		);

		return res.status(200).json({
			message: "Order updated with new Status",
			data: updatedOrder,
			status: "success",
		});
	} catch (error) {
		next(error);
	}
};

export const requestReturnItemController = async (req, res, next) => {
	try {
		const { id: orderId, itemId } = req.params;
		const { reason } = req.body;
		const user = req.user;
		const existingOrder = await Order.findOne({
			_id: orderId,
			user_id: user._id,
		}).populate("coupon_id");

		if (!existingOrder) throw new ErrorWithStatus("Order Not Found", HTTP_RES.NOT_FOUND);

		const existingOrderItem = await OrderItem.findOne({
			_id: itemId,
			order_id: existingOrder._id,
			is_cancelled: false,
			is_returned: false,
		});
		if (!existingOrderItem) throw new ErrorWithStatus("Order Item Not Found", HTTP_RES.NOT_FOUND);

		const currentStatus = existingOrder.status_history.slice(-1)[0].status;

		if (currentStatus != "DELIVERED" || existingOrderItem.status != "DELIVERED")
			throw new ErrorWithStatus("Cannot request a order return without being delivered", HTTP_RES.BAD_REQUEST);
		if (currentStatus == "RETURN_REQUESTED" || existingOrderItem.status == "RETURN_REQUESTED")
			throw new ErrorWithStatus("A return request is already sent", HTTP_RES.BAD_REQUEST);

		existingOrderItem.status = "RETURN_REQUESTED";
		existingOrderItem.return_reason = reason;
		await existingOrderItem.save();

		return res.status(200).json({
			message: "Order item updated with new Status",
			status: "success",
		});
	} catch (error) {
		next(error);
	}
};

export const verifyPayment = async (req, res, next) => {
	try {
		console.log(req.body);
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

		const result = await verifyPaymentService(razorpay_order_id, razorpay_payment_id, razorpay_signature);

		const transaction = await Transaction.findOne({ razorpay_order_id });
		if (result) {
			const order = await Order.findByIdAndUpdate(
				transaction.order_id,
				{ payment_status: "PAID" },
				{ new: true }
			).lean();
			if (!order) throw new ErrorWithStatus("Order Not foud", HTTP_RES.NOT_FOUND);
			const orderItems = await OrderItem.find({ order_id: order._id }).lean();

			for (const item of orderItems) {
				const variant = await ProductVariant.findById(item.variant_id).lean();
				if (!variant) throw new ErrorWithStatus("Variant not found", HTTP_RES.NOT_FOUND);

				if (variant.stock < item.quantity) {
					await Order.findByIdAndDelete(order._id);
					throw new ErrorWithStatus("Order cancelled Insufficent quantityt", HTTP_RES.NOT_FOUND);
				}
			}

			await Promise.all(
				orderItems.map((x) =>
					ProductVariant.findByIdAndUpdate({ _id: x.variant_id }, { $inc: { stock: -x.quantity } })
				)
			);
			return res.status(HTTP_RES.OK).json({ status: "success", message: "Transaction not verified" });
		} else {
			const order = await Order.findByIdAndDelete(transaction.order_id);
			return res.status(HTTP_RES.BAD_REQUEST).json({ status: "error", message: "Transaction verified" });
		}
	} catch (error) {
		next(error);
	}
};

export const cancelPayment = async (req, res, next) => {
	try {
		const { razorpay_order_id } = req.body;

		const transaction = await Transaction.findOneAndUpdate({ razorpay_order_id }, { status: "FAILED" });

		return res.status(HTTP_RES.ACCEPTED).json({ status: "success" });
	} catch (error) {
		next(error);
	}
};

export const repayOrderController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = req.user;
		const order = await Order.findById(id).lean();
		console.log(order);
		if (!order) throw new ErrorWithStatus("Order Not Found", HTTP_RES.NOT_FOUND);

		const orderItems = await OrderItem.find({ order_id: order._id }).lean();

		for (const item of orderItems) {
			const variant = await ProductVariant.findById(item.variant_id).lean();

			if (variant.stock < item.quantity) {
				throw new ErrorWithStatus("Order failed invalid stock", HTTP_RES.BAD_REQUEST);
			}
		}

		const razorpay_option = {
			amount: order.total_amount * 100,
			currency: "INR",
			receipt: order._id,
		};
		const razorpay_order = await razorpay.orders.create(razorpay_option);
		console.log(razorpay_order);
		const transaction = await Transaction.create([
			{
				user_id: user._id,
				order_id: order._id,
				type: "debit",
				amount: order.total_amount,
				status: "PENDING",
				razorpay_order_id: razorpay_order.id,
				description: `Payment initiated for ${order._id}`,
			},
		]);

		return res
			.status(HTTP_RES.OK)
			.json({ status: "success", message: "Repay successfuly init", data: razorpay_order });
	} catch (error) {
		next(error);
	}
};
