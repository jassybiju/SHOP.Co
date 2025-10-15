import mongoose from "mongoose";
import { User } from "../../models/user.model.js";
import { Order } from "../../models/order.model.js";
import { ProductVariant } from "../../models/product_variants.model.js";
import { OrderItem } from "../../models/order_item.model.js";
import { Cart } from "../../models/cart.model.js";

export const createOrderService = async (currentUser, orderData) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user = await User.findOne({ email: currentUser }).session(
            session
        );
        if (!user) {
            throw new Error("Unauthorized");
        }
        console.log(user);
        const order = new Order({
            payment_method: orderData.payment_method,
            shipping_address_id: orderData.shipping_address_id,
            user_id: user._id,
        });

        const orderItems = [];
        let total_amount = 0;
        console.log(order);
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
            const cartItem = await Cart.findOneAndDelete({
                user_id: user._id,
                variant_id: item.variant_id,
            });

            const productVariant = await ProductVariant.findByIdAndUpdate(
                item.variant_id,
                { $inc: { stock: -item.quantity } },
                { session, new: true }
            );

            total_amount +=
                product.price *
                (1 - orderItem.discount / 100) *
                item.quantity;
            console.log(orderItems);
        }

        order.delivery_fee = 15;
        order.total_amount = total_amount + order.delivery_fee;
        order.status_history = [{ status: "PLACED", description: "none" }];
        await order.save({ session });
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
