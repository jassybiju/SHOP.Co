    import ErrorWithStatus from "../../config/ErrorWithStatus.js";
import { Transaction } from "../../models/transaction.model.js";
import { Wallet } from "../../models/wallet.model.js";
import { addMoneyService } from "../../services/user/wallet.service.js";
import { HTTP_RES } from "../../utils/CONSTANTS.js";
import { verifyPaymentService } from "../../utils/helpers.js";

export const getWalletController = async (req, res, next) => {
	try {
		const user = req.user;
		const wallet = await Wallet.findOne({ user_id: user._id });
		const transactions = await Transaction.find({ user_id: user._id }).sort({createdAt : -1});

		return res.status(HTTP_RES.OK).json({ message: "Wallet data received successfully", data: { wallet, transactions }, status: "success" });
	} catch (error) {
		next(error);
	}
};

export const addMoneyController = async (req, res, next) => {
	try {
		const user = req.user;
		const { amount } = req.body;
		if (typeof amount !== Number && amount < 1) throw new ErrorWithStatus("Invalid Amount", HTTP_RES.BAD_REQUEST);
		const response = await addMoneyService(user, amount);
		return res.status(HTTP_RES.OK).json({ message: "Amount requested successfully", data: response, status: "success" });
	} catch (error) {
		next(error);
	}
};

export const verifyAddMoneyController = async (req, res, next) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
		const user = req.user;
		const result = await verifyPaymentService(razorpay_order_id, razorpay_payment_id, razorpay_signature);
		const transaction = await Transaction.findOne({ razorpay_order_id });
		await Wallet.findOneAndUpdate({ user_id: user._id }, { $inc: { balance: transaction.amount } });
		if (result) {
			return res.status(HTTP_RES.OK).json({ status: "success", message: "Transaction not verified" });
		} else {
			return res.status(HTTP_RES.BAD_REQUEST).json({ status: "error", message: "Transaction verified , Amount Credited" });
		}
	} catch (error) {
		next(error);
	}
};
