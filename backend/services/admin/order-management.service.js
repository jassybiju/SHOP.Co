import { Order } from "../../models/order.model.js";

export const getAllOrdersService = async (query) => {
    const limit = Number(query.limit) || 4;
    const page = Number(query.page) || 1;
    const search = query.search || "";
    const sortField = query.sort || "createdAt";
    const order = query.order === "desc" ? -1 : 1;
    const status = query.status?.toUpperCase() || "ALL";

    const filterOptions = {};
    if (status !== "ALL") {
        filterOptions["status_history.status"] = status;
    }
    if (search) {
        filterOptions.$or = [{ _id: { $regex: search, $options: "i" } }];
    }
    console.log(filterOptions.$or,search , sortField, 778)

    const aggregation_pipeline = [
        {
            $facet: {
                data: [
                    { $match: filterOptions },
                    { $sort: { [sortField]: order } },
                    { $skip: limit * (page - 1) },
                    { $limit: limit },
                    {
                        $lookup: {
                            from: "users",
                            let: { userId: "$user_id" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ["$_id", "$$userId"] },
                                    },
                                },
                                { $project: { _id: 0, email: 1 } },
                            ],
                            as: "user",
                        },
                    },
                    { $unwind: "$user" },
                ],
                total_order_entries: [
                    { $match: filterOptions },
                    { $count: "count" },
                ],
                total_orders: [{ $count: "count" }],
                delivered_orders: [
                    { $match: { "status_history.status": "DELIVERED" } },
                    { $count: "count" },
                ],
            },
        },
        {
            $project: {
                data: 1,
                pages: {
                    $cond: {
                        if: {
                            $gt: [
                                {
                                    $arrayElemAt: [
                                        "$total_order_entries.count",
                                        0,
                                    ],
                                },
                                0,
                            ],
                        },
                        then: {
                            $ceil: {
                                $divide: [
                                    {
                                        $arrayElemAt: [
                                            "$total_order_entries.count",
                                            0,
                                        ],
                                    },
                                    limit,
                                ],
                            },
                        },
                        else: 0,
                    },
                },
                limit: { $literal: limit },
                page: { $literal: page },
                total_orders: { $arrayElemAt: ["$total_orders.count", 0] },
                delivered_orders: {
                    $arrayElemAt: ["$delivered_orders.count", 0],
                },
            },
        },
    ];

    const data = await Order.aggregate(aggregation_pipeline);

    return data[0];
};
