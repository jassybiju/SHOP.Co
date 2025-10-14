import { User } from "../../models/user.model.js";
import { Order } from "../../models/order.model.js";
import { OrderItem } from "../../models/order_item.model.js";
import {
    orderSearchValidator,
    placeOrderValidator,
} from "../../validators/orderValidator.js";
import mongoose from "mongoose";
import { ProductVariant } from "../../models/product_variants.model.js";
import { Product } from "../../models/product.model.js";
import { Cart } from "../../models/cart.model.js";
import { createOrderService } from "../../services/user/order.service.js";
import { parse } from "dotenv";
import cloudinary from "../../utils/cloudinary.js";

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

        const { q, sort, order, status } = value;

        // Build query
        const query = { user_id: user._id };

        if (status && status.toLowerCase() !== "all") {
            query["status_history.status"] = status.toUpperCase();
        }

        if (q) {
            query["_id"] = { $regex: q, $options: "i" };
        }

        const orders = await Order.find(query)
            .sort({ [sort]: order.toLowerCase() === "asc" ? 1 : -1 })
            .lean();

        const orderIds = orders.map((o) => o._id);
        const orderItems = await OrderItem.find({ order_id: { $in: orderIds } })
            .populate({
                path: "variant_id",
                populate: {
                    path: "product_id",
                    select: "images price name",
                },
            })
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
                    image: cloudinary.url(
                        x.variant_id?.product_id?.images?.[0].url,
                        { secure: true }
                    ),
                    name: x.variant_id?.product_id?.name || null,
                    size: x.variant_id?.size,
                    color: x.variant_id?.color,
                })),
        }));

        return res.status(200).json({
            data: orderWithItems,
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
            .populate({ path: "shipping_address_id" })
            .lean();

        const orderItems = await OrderItem.find({ order_id: order._id })
            .populate({
                path: "variant_id",
                populate: "product_id",
                select: "images name",
            })
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

        const subtotal = simplifiedOrder.items.reduce(
            (acc, cur) => cur.price * cur.quantity + acc,
            0
        );
        const discountApplied = simplifiedOrder.items.reduce(
            (acc, cur) => acc + cur.price * (cur.discount / 100) * cur.quantity,
            0
        );
        console.log(subtotal);
        return res
            .status(200)
            .json({
                data: { ...simplifiedOrder, subtotal, discountApplied },
                status: "success",
                message: "Order Recieved Successfully",
            });
    } catch (error) {
        next(error);
    }
};

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
            throw new Error("Order not found");
        }

        const currentStatus = existingOrder.status_history.slice(-1)[0].status;

        if (
            [
                "SHIPPED",
                "DELIVERED",
                "CANCELLED",
                "RETURNED",
                "REFUNDED",
                "RETURNED",
                "REFUNDED",
                "CANCELLATION_REQUESTED",
            ].includes(currentStatus)
        )
            throw new Error(
                "Cannot request cancellation for an order currently in " +
                    currentStatus +
                    " status"
            );

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                $push: {
                    status_history: {
                        status: "CANCELLATION_REQUESTED",
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
