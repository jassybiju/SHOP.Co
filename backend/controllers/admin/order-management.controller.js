import { Order } from "../../models/order.model.js"
import {OrderItem} from '../../models/order_item.model.js'
import { getAllOrdersService, updateOrderStatusService } from "../../services/admin/order-management.service.js"
import cloudinary from "../../utils/cloudinary.js"
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

        const newOrder = await updateOrderStatusService(orderId,newStatus,description)

        return res.status(200).json({message : "Order status updated successfully", status : 'success', data : newOrder})

    }catch(error){
        next(error)
    }
}