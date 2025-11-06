import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import ErrorWithStatus from "../config/ErrorWithStatus.js";
import { Transaction } from "../models/transaction.model.js";
import { Wallet } from "../models/wallet.model.js"
import { razorpay } from "../config/razorpay.js";
import { HTTP_RES } from "./CONSTANTS.js";

export const createWallet = async(user_id) => {
    await Wallet.create({user_id : user_id})
}

export const verifyPaymentService = async (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
	const secret = razorpay.key_secret;
	const body = razorpay_order_id + "|" + razorpay_payment_id;
	console.log(secret, body);
	const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret);
	const transaction = await Transaction.findOne({ razorpay_order_id: razorpay_order_id });
	if (!transaction) throw new ErrorWithStatus("No transaction found", HTTP_RES.NOT_FOUND);

	let res;
	if (isValidSignature) {
		transaction.status = "SUCCESS";
		res = true;
	} else {
		transaction.status = "FAILED";
		res = false;
    }
	await transaction.save();
	return res;
};
