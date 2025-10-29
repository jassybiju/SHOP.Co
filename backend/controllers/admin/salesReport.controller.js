import { computeDateRange } from "../../services/admin/salesReport.service.js";
import { Order } from "../../models/order.model.js";
import { HTTP_RES } from "../../utils/CONSTANTS.js";
import { OrderItem } from "../../models/order_item.model.js";

export const getSalesReportController = async (req, res, next) => {
	try {
		const { range, start, end, page = 1, limit = 10 } = req.query;
		const { startDate, endDate } = computeDateRange(range, start, end);
        console.log(startDate, endDate)
		const skip = (page - 1) * limit;
		const filter = {
			createdAt: { $gte: startDate, $lte: endDate },
		};
		const totalOrders = await Order.countDocuments(filter);
		const grandTotalOrder = await Order.countDocuments();
		const order = await Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));

		filter.payment_status = "PAID";

		const totalPages = Math.ceil(totalOrders / limit);
		const [{ grandTotal: grandTotalAmount = 0 } = {}] = await Order.aggregate([
			{ $match: { payment_status: "PAID" } },
			{ $group: { _id: null, grandTotal: { $sum: "$total_amount" } } },
		]);
		const [{ grandTotalDiscount = 0 } = {}] = await OrderItem.aggregate([
			{
				$lookup: {
					from: "orders",
					localField: "order_id",
					foreignField: "_id",
					as: "order_details",
				},
			},
			{
				$unwind: "$order_details",
			},
			{
				$match: {
					// "order_details.createdAt": { $gte: startDate, $lte: endDate },
					"order_details.payment_status": "PAID",
					is_cancelled: false,
					is_returned: false,
				},
			},
			{
				$project: {
					_id: 0,
					discountAmount: {
						$multiply: [{ $toDouble: "$price" }, "$quantity", { $divide: ["$discount", 100] }],
					},
				},
			},
			{
				$group: {
					_id: null,
					grandTotalDiscount: { $sum: "$discountAmount" },
				},
			},
		]);

		// const [{ totalCouponDiscountAmount = 0, totalCouponsUsed = 0 } = {}] = await Order.aggregate([
		// 	{
		// 		$match: {
		// 			payment_status: "PAID",
		// 			coupon_id: { $ne: null },
		// 		},
		// 	},
		//     {
		//         $lookup : {
		//             from :'coupons',
		//             localField : 'coupon_id',
		//             foreignField : '_id',
		//             as : 'coupon_details'
		//         }
		//     },{
		//         $unwind : '$coupon_details'
		//     },{
		//         $project : {
		//             potentialDiscount : {
		//                 $multiply : [
		//                     '$total_amount' ,
		//                     {$divide : ['$coupon_details.discount_percentage',100]}
		//                 ]
		//             },
		//             minOrderAmount : '$coupon_details.min_order_amount',
		//             maxDiscountAmount : '$coupon_details.max_discount_amount',
		//             orderTotal : '$total_amount'
		//         }
		//     },{
		//         $project : {
		//             effectiveDiscount : {
		//                 $cond : {
		//                     if : {$lt : ["$orderTotal", "$minOrderAmount"]},
		//                     then : 0,
		//                     else :{
		//                         $cond : {
		//                             if : {$gt : ['$potentialDiscount','$maxDiscountAmount']},
		//                             then : '$maxDiscountAmout',
		//                             else : "$potentialDiscountAmount"
		//                         }
		//                     }
		//                 }
		//             }
		//         }
		//     },
		// 	{
		//         $group : {
		//             _id : null,
		//             totalCouponsUsed : { $sum : 1},
		//             totalCouponDiscountAmount : {$sum : '$effectiveDiscount'}
		//         }
		//     },
		// ]);

		const couponOrders = await Order.find({ payment_status: "PAID", coupon_id: { $ne: null } })
			.select("total_amount coupon_id")
			.populate("coupon_id")
			.lean();

		let totalCouponDiscountAmount = 0,
			totalCouponsUsed = 0;
		console.log(couponOrders);

		for (const order of couponOrders) {
			const coupon = order.coupon_id;
			if (!coupon || !coupon.discount_percentage) continue;
			const orderItems = await OrderItem.find({ order_id: order._id, is_returned: false, is_cancelled: false }).lean();
			let subTotal = 0;
			console.log(orderItems);

			for (const item of orderItems) {
				const itemPrice = parseFloat(item.price.toString());
				const itemQuantity = item.quantity;
				const itemDiscount = item.discount / 100;

				const netPrice = itemPrice * itemQuantity * (1 - itemDiscount);
				console.log(netPrice);
				subTotal += netPrice;
			}

			if (subTotal >= coupon.min_order_amount) {
				// let potentialDiscount = subTotal * (coupon.discount_percentage / 100)
				// console.log(subTotal)
				// let effectiveDiscount ;
				// if(potentialDiscount > coupon.max_discount_amount){
				//     effectiveDiscount = coupon.max_discount_amount
				// }else{
				//     effectiveDiscount = potentialDiscount
				// }
				// totalCouponDiscountAmount+= effectiveDiscount
				// console.log(totalCouponDiscountAmount)
				const potentialDiscount = subTotal * (coupon.discount_percentage / 100);
				const effectiveDiscount = potentialDiscount > coupon.max_discount_amount ? coupon.max_discount_amount : potentialDiscount;
				console.log(effectiveDiscount, order.total_amount, subTotal);
				totalCouponDiscountAmount += effectiveDiscount;
				totalCouponsUsed++;
			}
		}

		console.log(totalCouponDiscountAmount);
		res.status(HTTP_RES.OK).json({
			message: "Report Recieved Succesfully",
			data: { order, pages: totalPages, page, limit, startDate, endDate, grandTotalOrder, grandTotalAmount, grandTotalDiscount, totalCouponDiscountAmount },
			status: "success",
		});
	} catch (error) {
		next(error);
	}
};

export const getSalesReportDownloadableController = async (req, res, next) => {
	try {
		const { range, start, end } = req.query;
		const { startDate, endDate } = computeDateRange(range, start, end);

		const filter = {
			createdAt: { $gte: startDate, $lte: endDate },
		};
		const totalOrders = await Order.countDocuments(filter);
		const orders = await Order.find(filter)
			.sort({ createdAt: -1 })
			.populate([
				{ path: "user_id", select: "email phone first_name last_name" },
				{ path: "shipping_address_id" },
				{ path: "coupon_id", select: "discount_percentage name code" },

			])
			.lean();
		const simplifiedOrders = [];

		for (const order of orders) {
			// Get all order items
			const orderItems = await OrderItem.find({ order_id: order._id })
				.populate({
					path: "variant_id",
					populate: { path: "product_id", select: "images name" },
				})
				.lean();

			// Calculate subtotal and discounts
			const activeItems = orderItems.filter((item) => !item.is_cancelled && !item.is_returned);

			const subtotal = activeItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
			const discountApplied = activeItems.reduce((acc, item) => acc + item.price * (item.discount / 100) * item.quantity, 0);

			let couponDiscountApplied = 0;
			if (order.coupon_id?.discount_percentage) {
				const coupon = order.coupon_id;
				const subtotalAfterItemDiscount = subtotal - discountApplied;

				// Only apply if min order condition is met
				if (subtotalAfterItemDiscount >= (coupon.min_order_amount || 0)) {
					const potentialDiscount = subtotalAfterItemDiscount * (coupon.discount_percentage / 100);
					couponDiscountApplied = Math.min(potentialDiscount, coupon.max_discount_amount || potentialDiscount);
				}
			}

			simplifiedOrders.push({
				...order,
				subtotal,
				discountApplied,
				couponDiscountApplied,
			});
		}
		res.status(HTTP_RES.OK).json({ message: "Report Recieved Succesfully", data: { order : simplifiedOrders, totalOrders, startDate, endDate }, status: "success" });
	} catch (error) {
		next(error);
	}
};
