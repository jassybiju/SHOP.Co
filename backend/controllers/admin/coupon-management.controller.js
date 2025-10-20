import ErrorWithStatus from "../../config/ErrorWithStatus.js";
import { Coupon } from "../../models/coupon.model.js";
import { CouponUsage } from "../../models/coupon_usage.model.js";
import { addCouponService } from "../../services/admin/coupon-management.service.js";
import { HTTP_RES } from "../../utils/CONSTANTS.js";
import { couponValidator } from "../../validators/admin/couponValidator.js";

export const addCouponController = async (req, res, next) => {
	try {
		console.log(req.body);
		const { value, error } = couponValidator(req.body);

		if (error) throw error;
		const result = await addCouponService(value);
		res.status(HTTP_RES.CREATED).json({
			data: result,
			message: "Coupon Created Successfully",
			status: "success",
		});
	} catch (error) {
		next(error);
	}
};

export const getAllCouponsController = async (req, res, next) => {
	try {
		const result = await Coupon.find();

		return res.status(HTTP_RES.OK).json({
			message: "Coupons Recieved Successfully",
			data: result,
			status: "success",
		});
	} catch (error) {
		next(error);
	}
};

export const getCouponByIdController = async (req, res, next) => {
	try {
		const result = await Coupon.findById(req.params.id);
		if (!result) throw new ErrorWithStatus("Coupn Not Found", HTTP_RES.NOT_FOUND);
		return res.status(HTTP_RES.OK).json({
			message: "Coupon Recieved Successfully",
			data: result,
			status: "success",
		});
	} catch (error) {
		next(error);
	}
};

// ! TODO
export const editCouponController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { value, error } = couponValidator(req.body);
		if (error) {
			throw error;
		}
		return res.status(HTTP_RES.ACCEPTED).status({
			message: "Coupon Edited Successfully",
			data: value,
			status: "success",
		});
	} catch (error) {
		next(error);
	}
};

export const validateCouponController = async (req, res, next) => {
	try {
		const { code, cartTotal } = req.body;
		const user = req.user;
		console.log(code, cartTotal);
		if (!code || !cartTotal) throw new ErrorWithStatus("Body is not correct", HTTP_RES.UNPROCESSABLE_ENTITY);

		const coupon = await Coupon.findOne({ code: code, is_active: true });
		if (!coupon) throw new ErrorWithStatus("Coupon not found", HTTP_RES.NOT_FOUND);
		if (coupon.expiry_date < new Date()) throw new ErrorWithStatus("Coupon Expired", HTTP_RES.BAD_REQUEST);
		if (coupon.for_user && user._id !== coupon.for_user) throw new ErrorWithStatus("User not authorized to use the Token", HTTP_RES.UNAUTHORIZED);

		const couponUsedCount = await CouponUsage.find({
			coupon_id: coupon._id,
		}).countDocuments();
		const userCouponUsage = await CouponUsage.find({ coupon_id: coupon._id, user_id: user._id }).countDocuments();
		if (couponUsedCount >= coupon.usage_limit) throw new ErrorWithStatus("Coupon can't be used", HTTP_RES.UNPROCESSABLE_ENTITY);
		if (userCouponUsage !== 0) throw new ErrorWithStatus("Coupon Already Used by user", HTTP_RES.CONFLICT);

		if (coupon.min_order_amount > cartTotal) throw new ErrorWithStatus("Coupon not applicable");

		return res
			.status(HTTP_RES.OK)
			.json({
				message: "Coupon is valid and applicable",
				data: {
					discountPercentage: coupon.discount_percentage,
					maxDiscountAmount: coupon.max_discount_amount,
					code: code,
					discountAmount: cartTotal * (0.01 * coupon.discount_percentage) < coupon.max_discount_amount ? cartTotal * (0.01 * coupon.discount_percentage).toFixed(2) : coupon.max_discount_amount,
				},
				status: "success",
			});
	} catch (error) {
		next(error);
	}
};
