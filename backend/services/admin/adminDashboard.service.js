import { Order } from "../../models/order.model.js";

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
				groupStage = { $isoWeekYear: "$createdAt" };
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
					value: {$round : ["$sum",2]},

					_id: 0,
				},
			},
		]);
		return result;
	}
}
