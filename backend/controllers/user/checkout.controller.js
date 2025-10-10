import { Cart } from "../../models/cart.model.js"
import { User } from "../../models/user.model.js"
import { Address } from "../../models/address.model.js"
import cloudinary from "../../utils/cloudinary.js"

export const checkoutController = async(req, res, next) =>  {
    try {
        const user = await User.findOne({email : req.email})
        const cart = await Cart.find({user_id : user._id}).populate({
            path : 'variant_id',
            populate : {
                path : 'product_id',
                populate : {
                    path : 'category_id',
                    select : "is_active"
                },
                select : 'is_active name images price discount'
            },
            select : 'color size stock'
        })

        console.log(cart)
        const simplifiedCart = cart.map(x => {
              const variant = x.variant_id;
                        const product = variant.product_id;
                        const category = product.category_id;
                        console.log(category)
                        const isActive =  product.is_active && category.is_active;
            
                        return {
                            _id: x._id,
                            variant_id: variant._id,
                            product_id: product._id,
                            name : product.name,
                            color: variant.color,
                            price : product.price,
                            
                            discount : product.discount,
                            size: variant.size,
                            stock: variant.stock,
                            is_active: isActive,
                            image: cloudinary.url(product.images?.[0]?.url || null, {
                                secure: true,
                            }),
                            quantity: x.quantity,
                        };
        })
        const subtotal = simplifiedCart.reduce((acc, cur) => cur.price + acc , 0)
        const discount = simplifiedCart.reduce((acc, cur) => cur.discount + acc , 0)
        const discountedAmount = subtotal - (subtotal * (discount / 100))
        const delivery_fee = 15
        const total = discountedAmount + delivery_fee
        console.log(subtotal , discount, discountedAmount , total)
        if(simplifiedCart.some(x => !x.is_active)){
            throw new Error("Cart includes blocked items")
        }
        const address = await Address.find({user_id : user._id})
        return res.status(200).json({message : "Checkout created Successfully", status : 'success', data : {cart : simplifiedCart, address : address , subtotal  , discount , discountedAmount, delivery_fee , total}})
    } catch (error) {
        next(error)
    }
}