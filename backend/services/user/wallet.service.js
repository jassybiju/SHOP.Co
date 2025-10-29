import { razorpay } from "../../config/razorpay.js"
import { Transaction } from "../../models/transaction.model.js"
import { Wallet } from "../../models/wallet.model.js"

export const addMoneyService = async(user, amount)=> {
    const razorpay_option = {
        amount : amount * 100,
        currency : "INR",
        receipt : user.email
    }
    const razorpay_order = await razorpay.orders.create(razorpay_option)
    const wallet = await Wallet.findOne({user_id : user._id})
    await Transaction.create([
        {
            user_id : user._id,
            wallet_id : wallet._id,
            type : "credit",
            amount : amount,
            status : "PENDING",
            razorpay_order_id : razorpay_order.id,
            description : "Crediting amount : "+amount
        }
    ])

    return razorpay_order
}