import { Order } from "../../models/order.model.js";
import { OrderItem } from "../../models/order_item.model.js";
import { ProductVariant } from "../../models/product_variants.model.js";

export class AdminDashboardService {
	static async getChartData(type = "daily") {
		let groupStage, projectDateStage;

		switch (type) {
			case "weekly":
				groupStage = {
					year: { $isoWeekYear: "$createdAt" },
					week: { $isoWeek: "$createdAt" },
				};
				projectDateStage = {
					$concat: [
						{
							$dateToString: {
								format: "%Y/%m/%d",
								date: {
									$dateFromParts: {
										isoWeekYear: "$_id.year",
										isoWeek: "$_id.week",
										isoDayOfWeek: 1,
									},
								},
							},
						},
						"-",
						{
							$dateToString: {
								format: "%Y/%m/%d",
								date: {
									$dateFromParts: {
										isoWeekYear: "$_id.year",
										isoWeek: "$_id.week",
										isoDayOfWeek: 7,
									},
								},
							},
						},
					],
				};
				break;
			case "daily":
				groupStage = {
					$dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
				};
				projectDateStage = "$_id";
				break;
			case "monthly":
				groupStage = { $month: "$createdAt" };
				projectDateStage = "$_id";
				break;
		}

		const result = await Order.aggregate([
			{
				$group: {
					_id: groupStage,
					order: { $push: "$_id" },
					sum: {
						$sum: {
							$cond: [
								{
									$or: [
										{ $ne: ["$payment_method", "RAZORPAY"] },
										{ $eq: ["$payment_status", "PAID"] },
									],
								},
								"$total_amount",
								0,
							],
						},
					},
				},
			},
			{
				$sort: { _id: 1 },
			},
			{
				$project: {
					date: projectDateStage,
					value: { $round: ["$sum", 2] },

					_id: 0,
				},
			},
		]);
		return result;
	}

	static async topThreeData() {
		const productVariants = await ProductVariant.find().lean();
		console.log(productVariants);
		const data =await Promise.all([ OrderItem.aggregate([
			{
				$lookup: {
					from: "productvariants",
					localField: "variant_id",
					foreignField: "_id",
					as: "variant",
				},
			},
			{
				$unwind: "$variant",
			},
			{
				$group: {
					_id: "$variant.product_id",
					count: { $sum: 1 },
				},
			},
			{
				$lookup: {
					from: "products",
					localField: "_id",
					foreignField: "_id",
					as: "product",
				},
			},
			{
				$project: {
					name: { $arrayElemAt: ["$product.name", 0] },
					_id: "$_id",
					count: "$count",
				},
			},
			{
				$sort: { count: -1 },
			},
			{
				$limit: 4,
			},
		]),
     OrderItem.aggregate([
			{
				$lookup: {
					from: "productvariants",
					localField: "variant_id",
					foreignField: "_id",
					as: "variant",
				},
			},
			{ $unwind: "$variant" },
			{
				$lookup: {
					from: "products",
					localField: "variant.product_id",
					foreignField: "_id",
					as: "product",
				},
			},
			{
				$group: {
					_id: "$product.category_id",
					count: { $sum: 1 },
					products: { $addToSet: "$product._id" },
				},
			},
			{
				$lookup: {
					from: "categories",
					localField: "_id",
					foreignField: "_id",
					as: "category",
				},
			},
			{
				$project: {
					_id: {$arrayElemAt : ['$_id', 0]},
					count: 1,
					name: { $arrayElemAt: ["$category.name", 0] },
				},
			},
			{ $sort: { count: -1 } },
			{ $limit: 3 },
		]),
	 OrderItem.aggregate([
			{
				$lookup: {
					from: "productvariants",
					localField: "variant_id",
					foreignField: "_id",
					as: "variant",
				},
			},
			{ $unwind: "$variant" },
			{
				$lookup: {
					from: "products",
					localField: "variant.product_id",
					foreignField: "_id",
					as: "product",
				},
			},
			{
				$group: {
					_id: "$product.brand_id",
					count: { $sum: 1 },
					products: { $addToSet: "$product._id" },
				},
			},
			{
				$lookup: {
					from: "brands",
					localField: "_id",
					foreignField: "_id",
					as: "brand",
				},
			},
			{
				$project: {
					_id: { $arrayElemAt: ["$_id", 0] },
					count: 1,
					name: { $arrayElemAt: ["$brand.name", 0] },
				},
			},
			{ $sort: { count: -1 } },
			{ $limit: 3 },
		])

])
		return {topProducts : data[0],topCategories : data[1], topBrands : data[2]};
	}
}
