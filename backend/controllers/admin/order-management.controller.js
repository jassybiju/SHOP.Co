import { Order } from "../../models/order.model.js"
import {OrderItem} from '../../models/order_item.model.js'
import { getAllOrdersService } from "../../services/admin/order-management.service.js"
import cloudinary from "../../utils/cloudinary.js"
import { STATUS_TRANSITIONS } from "../../utils/CONSTANTS.js"
import { orderStatusValidator } from "../../validators/orderValidator.js"

export const getAllOrdersController = async(req, res, next) => {
    try {
        const query = req.query
        const orderRes = await getAllOrdersService(query)
        return res.status(200).json({message : "Order Recieved Successfully", data : orderRes , status : 'success'})
    } catch (error) {
        next(error)
    }
}

const isPhysicalStatus = (status) =>  ['PLACED', 'CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED', 'RETURNED'].includes(status)

export const getOrderController = async(req, res, next) => {
    try {
        const {id} = req.params

        const order = await Order.findById(id).populate([{
            path : 'user_id',
            select : "email phone first_name last_name"
        },{
            path: 'shipping_address_id'
        }]).lean()

        const order_items  = await OrderItem.find({order_id : order._id}) .populate({
                path: "variant_id",
                populate: {
                    path: "product_id",
                    select: "images  name",
                },
            })
            .lean();

        const simplifiedOrder = {
            ...order,
            items : order_items.map(x => {
                const variant = x.variant_id
                const product = variant.product_id
                console.log(product)
                return {
                    ...x,
                    images : cloudinary.url(product.images[0].url, {secure : true}),
                    name : product.name,
                    color : variant.color,
                    size : variant.size,
                    price : x.price.toString()
                }
            }),

        }
        const subtotal = simplifiedOrder.items.reduce((acc, cur) => (cur.price * cur.quantity) + acc,0  )
        const discountApplied = simplifiedOrder.items.reduce((acc, cur)=> acc +( (cur.price * (cur.discount / 100)) * cur.quantity), 0)
        console.log(subtotal)
        return res.status(200).json({data : {...simplifiedOrder, subtotal , discountApplied} , status : "success", message : "Order Recieved Successfully"})
    } catch (error) {
        next(error)
    }
}

export const updateOrderStatus = async (req, res, next) => {
    try{
        const {id : orderId} = req.params
        const {value , error} = orderStatusValidator(req.body)

        if(error){
            throw error
        }

        const {status : newStatus, description} = value

        if(["RETURN_REQUESTED", "CANCELLATION_DENIED","CANCELLATION_REQUESTED"].includes(newStatus)) throw new Error("Cannot set the specfic Status")

        const existingOrder = await Order.findById(orderId)

        if(!existingOrder) throw new Error("Order Not Found ")

        const currentStatus = existingOrder.status_history.slice(-1)[0].status
        console.log(currentStatus)

        const allowedTransitions = STATUS_TRANSITIONS[currentStatus]

        if(!allowedTransitions.includes(newStatus))throw new Error("Invalid Status Transition")

        const updates = {
            $push: {}
        }

        // here admin is denying request by selecting another status
        if(currentStatus === 'CANCELLATION_REQUESTED' && isPhysicalStatus(newStatus)){
            updates.$push.status_history = {
                $each : [{
                    status : "CANCELLATION_DENIED",
                    description : `Cancellation request denied reason : ${description}, process continued to ${newStatus}`
                }]
            }

            const statusBeforeRequest = existingOrder.status_history.slice(-2)[0].status

            const flowCheckTransition = STATUS_TRANSITIONS[statusBeforeRequest]
            if( isPhysicalStatus(newStatus) && !flowCheckTransition.includes(newStatus)){
                throw new Error("Invalid Denial Transition, cannot jump from " + statusBeforeRequest + ' to ' + newStatus)
            }

        }
        const newStatusEntry = {
            status : newStatus,
            description : description
        }

        if(Array.isArray(updates.$push.status_history?.$each)){
            updates.$push.status_history.$each.push(newStatusEntry)
        }else{
            updates.$push.status_history = newStatusEntry
        }

        if(newStatus === 'CANCELLED'){
            updates.$set = updates.$set || {}
            if(existingOrder.payment_status === 'PAID'){
                updates.$set.payment_status = 'REFUNDED'
                newStatusEntry.description = description || "Order cancelled by admin , Initiating refund"
            }else if (["PENDING", "PROCESSING"].includes(existingOrder.payment_status)){
                updates.$set.payment_status = 'CANCELLED'
                newStatusEntry.description = description || "Order cancelled by admin, payment halted"
            }
        }

        if(newStatus === 'RETURNED'){
            updates.$set = updates.$set ||{}
            if(existingOrder.payment_status === 'PAID'){
                updates.$set.payment_status = 'REFUNDED'
                newStatusEntry.description = description || "Return approved"
            }else{
                updates.$set.payment_status = 'CANCELLED'
                newStatusEntry.description = description || "Return Processed"
            }
        }
        const updatedOrder = await Order.findByIdAndUpdate(orderId,updates,{new : true, runValidators : true})

        return res.status(200).json({message : "Order status updated successfully", status : 'success', data : updatedOrder})

    }catch(error){
        next(error)
    }
}