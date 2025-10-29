import ErrorWithStatus from "../../config/ErrorWithStatus.js";
import { Order } from "../../models/order.model.js";
import { OrderItem } from "../../models/order_item.model.js";
import { ProductVariant } from "../../models/product_variants.model.js";
import { Wallet } from "../../models/wallet.model.js";
import { Transaction } from "../../models/transaction.model.js";
import { getAllOrdersService, updateOrderStatusService } from "../../services/admin/order-management.service.js";
import cloudinary from "../../utils/cloudinary.js";
import { HTTP_RES } from "../../utils/CONSTANTS.js";
import { toFixedNum } from "../../utils/toFixedNum.js";
import { orderStatusValidator } from "../../validators/orderValidator.js";

export const getAllOrdersController = async (req, res, next) => {
	try {
		const query = req.query;
		const orderRes = await getAllOrdersService(query);
		return res.status(200).json({ message: "Order Recieved Successfully", data: orderRes, status: "success" });
	} catch (error) {
		next(error);
	}
};

export const getOrderController = async (req, res, next) => {
	try {
		const { id } = req.params;

		const order = await Order.findById(id)
			.populate([
				{
					path: "user_id",
					select: "email phone first_name last_name",
				},
				{
					path: "shipping_address_id",
				},
				{
					path: "coupon_id",
					select: "discount_percentage name code",
				},
			])
			.lean();

		if (!order) {
			throw new ErrorWithStatus("Order Not Found", HTTP_RES.NOT_FOUND);
		}

		const order_items = await OrderItem.find({ order_id: order._id })
			.populate({
				path: "variant_id",
				populate: {
					path: "product_id",
					select: "images  name",
				},
			})
			.lean();

		const simplifiedOrder = {
			...order,
			items: order_items.map((x) => {
				const variant = x.variant_id;
				const product = variant.product_id;
				console.log(product);
				return {
					...x,
					images: cloudinary.url(product.images[0].url, { secure: true }),
					name: product.name,
					color: variant.color,
					size: variant.size,
					price: x.price.toString(),
				};
			}),
		};
		const activeOrder = simplifiedOrder.items.filter((item) => !item.is_cancelled);
		const subtotal = activeOrder.reduce((acc, cur) => cur.price * cur.quantity + acc, 0);
		const discountApplied = simplifiedOrder.items.reduce((acc, cur) => acc + cur.price * (cur.discount / 100) * cur.quantity, 0);

		let couponDiscountApplied = 0;
		if (order.coupon_id?.discount_percentage) {
			couponDiscountApplied = ((subtotal - discountApplied) * order.coupon_id.discount_percentage) / 100;
		}
		return res
			.status(200)
			.json({ data: { ...simplifiedOrder, subtotal, discountApplied, couponDiscountApplied }, status: "success", message: "Order Recieved Successfully" });
	} catch (error) {
		next(error);
	}
};

export const updateOrderStatus = async (req, res, next) => {
	try {
		const { id: orderId } = req.params;
		const { value, error } = orderStatusValidator(req.body);

		if (error) {
			throw error;
		}
		const { status: newStatus, description } = value;

		const newOrder = await updateOrderStatusService(orderId, newStatus, description);

		return res.status(200).json({ message: "Order status updated successfully", status: "success", data: newOrder });
	} catch (error) {
		next(error);
	}
};

export const returnOrderItemController = async (req, res, next) => {
	try {
		const { id: orderId, itemId } = req.params;
		const { status: newStatus, description } = req.body;

		console.log(itemId);
		if (!["RETURN_ACCEPTED", "RETURN_DENIED"].includes(newStatus)) {
			throw new ErrorWithStatus("Invalid status", HTTP_RES.BAD_REQUEST);
		}

		const existingOrder = await Order.findById(orderId).populate("coupon_id");
		if (!existingOrder) throw new ErrorWithStatus("Order Not found", HTTP_RES.NOT_FOUND);

		const existingOrderItem = await OrderItem.findById(itemId);
		if (!existingOrderItem) throw new ErrorWithStatus("Order Item not found", HTTP_RES.NOT_FOUND);

		const currentOrderStatus = existingOrder.status_history.slice(-1)[0].status;
		const currentOrderItemStatus = existingOrderItem.status;

		if (currentOrderItemStatus !== "RETURN_REQUESTED" || currentOrderStatus !== "DELIVERED") {
			throw new ErrorWithStatus("Invalid Request", HTTP_RES.BAD_REQUEST);
		}

		if (newStatus === "RETURN_DENIED") {
			existingOrderItem.status = "RETURN_DENIED";
			await existingOrderItem.save();
			return res.status(HTTP_RES.OK).json({ message: "Return Denied Successfully", status: "success" });
		} else {
			existingOrderItem.is_returned = true;
			existingOrderItem.status = "RETURNED";
			await existingOrderItem.save();

			await ProductVariant.findByIdAndUpdate({ _id: existingOrderItem.variant_id }, { $inc: { stock: existingOrderItem.quantity } });

			const orderItems = await OrderItem.find({ order_id: orderId, is_cancelled: false, is_returned: false, _id: { $ne: itemId } }).lean();
			// if(orderItems.length === 1) throw new ErrorWithStatus("Last item return whole order", HTTP_RES.BAD_REQUEST)

			let newTotal = 0;
			if (orderItems.length === 0) {
				existingOrder.status_history = [...existingOrder.status_history, { status: "RETURNED", description: description }];
			} else {
				const orderSubtotal = orderItems.reduce((sum, item) => {
					const priceNum = parseFloat(item.price.toString());
					console.log(priceNum);
					return sum + priceNum * item.quantity * (1 - item.discount / 100);
				}, 0);

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

				newTotal = orderSubtotal === 0 ? 0 : orderSubtotal + (existingOrder.delivery_fee || 15) - couponDiscount;
				console.log(newTotal, orderSubtotal, existingOrder.delivery_fee, couponDiscount);
			}

			if (existingOrder.payment_status === "PAID") {
				const refundAmount = Math.max(0, existingOrder.total_amount - newTotal);
				console.log(refundAmount, 100);
				if (refundAmount > 0) {
					const wallet = await Wallet.findOneAndUpdate(
						{ user_id: existingOrder.user_id },
						{ $inc: { balance: toFixedNum(refundAmount) } },
						{ upsert: true, new: true }
					);

					await Transaction.create({
						user_id: existingOrder.user_id,
						order_id: existingOrder._id,
						amount: toFixedNum(refundAmount),
						type: "refund",
						status: "SUCCESS",
						reason: `Order item returned from order ${existingOrder._id}`,
					});
				}
			}
			if (newTotal <= existingOrder.total_amount) {
				existingOrder.total_amount = newTotal;
			}
			await existingOrder.save();

			return res.status(HTTP_RES.OK).json({ message: "Success", status: "success" });
		}
	} catch (error) {
		next(error);
	}
};
