import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
	{
		wallet_id: {
			type: mongoose.Schema.Types.ObjectId,
			default: null,
			ref: "wallet",
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			default: null,
		},
		order_id: {
			type: String,
			ref: "order",
			default: null,
		},
		type: {
			type: String,
			enum: ["credit", "debit", "refund"],
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: ["PENDING", "SUCCESS", "FAILED"],
			default: "PENDING",
		},

		razorpay_order_id: {
			type: String,
			default: null,
		},
		razorpay_payment_id: {
			type: String,
			default: null,
		},
		description: {
			type: String,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
