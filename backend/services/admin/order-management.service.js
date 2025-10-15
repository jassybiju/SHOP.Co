import ErrorWithStatus from "../../config/ErrorWithStatus.js";
import { Order } from "../../models/order.model.js";
import { HTTP_RES, STATUS_TRANSITIONS } from "../../utils/CONSTANTS.js";

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
    console.log(filterOptions.$or, search, sortField, 778);

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

// ! CHANGE TO UTILS
const isPhysicalStatus = (status) =>
    [
        "PLACED",
        "CONFIRMED",
        "PACKED",
        "SHIPPED",
        "DELIVERED",
        "RETURNED",
    ].includes(status);

export const updateOrderStatusService = async (
    orderId,
    newStatus,
    description
) => {
    if (
        [
            "RETURN_REQUESTED",
            "CANCELLATION_DENIED",
            "CANCELLATION_REQUESTED",
        ].includes(newStatus)
    )
        throw new ErrorWithStatus("Cannot set the specfic Status",HTTP_RES.BAD_REQUEST);

    const existingOrder = await Order.findById(orderId);

    if (!existingOrder) throw new ErrorWithStatus("Order Not Found ",HTTP_RES.NOT_FOUND);

    const currentStatus = existingOrder.status_history.slice(-1)[0].status;
    console.log(currentStatus);

    const allowedTransitions = STATUS_TRANSITIONS[currentStatus];

    if (!allowedTransitions.includes(newStatus))
        throw new ErrorWithStatus("Invalid Status Transition",HTTP_RES.CONFLICT);

    const updates = {
        $push: {},
    };

    // here admin is denying request by selecting another status
    if (
        currentStatus === "CANCELLATION_REQUESTED" &&
        isPhysicalStatus(newStatus)
    ) {
        updates.$push.status_history = {
            $each: [
                {
                    status: "CANCELLATION_DENIED",
                    description: `Cancellation request denied reason : ${description}, process continued to ${newStatus}`,
                },
            ],
        };

        const statusBeforeRequest =
            existingOrder.status_history.slice(-2)[0].status;

        const flowCheckTransition = STATUS_TRANSITIONS[statusBeforeRequest];
        if (
            isPhysicalStatus(newStatus) &&
            !flowCheckTransition.includes(newStatus)
        ) {
            throw new ErrorWithStatus(
                "Invalid Denial Transition, cannot jump from " +
                    statusBeforeRequest +
                    " to " +
                    newStatus, HTTP_RES.CONFLICT
            );
        }
    }
    const newStatusEntry = {
        status: newStatus,
        description: description,
    };

    if (Array.isArray(updates.$push.status_history?.$each)) {
        updates.$push.status_history.$each.push(newStatusEntry);
    } else {
        updates.$push.status_history = newStatusEntry;
    }

    if (newStatus === "CANCELLED") {
        updates.$set = updates.$set || {};
        if (existingOrder.payment_status === "PAID") {
            updates.$set.payment_status = "REFUNDED";
            newStatusEntry.description =
                description || "Order cancelled by admin , Initiating refund";
        } else if (
            ["PENDING", "PROCESSING"].includes(existingOrder.payment_status)
        ) {
            updates.$set.payment_status = "CANCELLED";
            newStatusEntry.description =
                description || "Order cancelled by admin, payment halted";
        }
    }

    if (newStatus === "RETURNED") {
        updates.$set = updates.$set || {};
        if (existingOrder.payment_status === "PAID") {
            updates.$set.payment_status = "REFUNDED";
            newStatusEntry.description = description || "Return approved";
        } else {
            updates.$set.payment_status = "CANCELLED";
            newStatusEntry.description = description || "Return Processed";
        }
    }
    return await Order.findByIdAndUpdate(orderId, updates, {
        new: true,
        runValidators: true,
    });
};
