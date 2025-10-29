import ErrorWithStatus from "../../config/ErrorWithStatus.js";
import { Coupon } from "../../models/coupon.model.js";
import { CouponUsage } from "../../models/coupon_usage.model.js";
import { Order } from "../../models/order.model.js";
import { addCouponService, editCouponService } from "../../services/admin/coupon-management.service.js";
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
		const { q, filter = "all", page = 1, limit = 10 } = req.query;
		const skip = (page - 1) * limit;
		const filterOptions = {
			all: {},
			active: { is_active: true },
			"in-active": { is_active: false },
		};
		const filters = filterOptions[filter];
		filters.$or = [{ code: { $regex: q, $options: "i" } }, { name: { $regex: q, $options: "i" } }];
		console.log(req.query);
		console.log(filters);
		const totalCoupons = await Coupon.countDocuments(filters);
		const coupons = await Coupon.find(filters).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));

		const totalPages = Math.ceil(totalCoupons / limit);
		console.log(totalCoupons, limit);
		return res.status(HTTP_RES.OK).json({
			message: "Coupons Recieved Successfully",
			data: { coupons, pages: totalPages, page, limit },
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
		console.log(value);
		const result = await editCouponService(id, value);
		return res.status(HTTP_RES.ACCEPTED).json({
			message: "Coupon Edited Successfully",
			data: result,
			status: "success",
		});
	} catch (error) {
		next(error);
	}
};

export const toggleCouponController = async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(id);
		const exisitingCoupon = await Coupon.findOne({ _id: id });
		if (!exisitingCoupon) throw new ErrorWithStatus("Coupon Not Found", HTTP_RES.NOT_FOUND);

		exisitingCoupon.is_active = !exisitingCoupon.is_active;

		await exisitingCoupon.save();

		return res.status(HTTP_RES.OK).json({ message: "Coupon Status Updated successfully", status: "success" });
	} catch (err) {
		next(err);
	}
};

export const validateCouponController = async (req, res, next) => {
	try {
		const { code, cartTotal } = req.body;
		const user = req.user;
		console.log(code, cartTotal);
		if (!code || !cartTotal) throw new ErrorWithStatus("Body is not correct", HTTP_RES.UNPROCESSABLE_ENTITY);
        console.log(cartTotal)
        // * validating coupon
		const coupon = await Coupon.findOne({ code: code, is_active: true });
		if (!coupon) throw new ErrorWithStatus("Coupon not found", HTTP_RES.NOT_FOUND);
		if (coupon.expiry_date < new Date()) throw new ErrorWithStatus("Coupon Expired", HTTP_RES.BAD_REQUEST);
		console.log(user._id, coupon.for_user);
		if (coupon.for_user && !user._id.equals(coupon.for_user)) throw new ErrorWithStatus("User not authorized to use the Token", HTTP_RES.UNAUTHORIZED);
		const couponUsedCount = await CouponUsage.find({
			coupon_id: coupon._id,
		}).countDocuments();
		const userCouponUsage = await CouponUsage.find({ coupon_id: coupon._id, user_id: user._id }).countDocuments();
        console.log(couponUsedCount,44565)
		if (couponUsedCount >= coupon.usage_limit) throw new ErrorWithStatus("Coupon can't be used", HTTP_RES.UNPROCESSABLE_ENTITY);
		// ! TODO UNCOMMENT
		// if (userCouponUsage !== 0) throw new ErrorWithStatus("Coupon Already Used by user", HTTP_RES.CONFLICT);
		if (coupon.min_order_amount > cartTotal) throw new ErrorWithStatus("Coupon not applicable");

        // * validation ended

        const cartTotalWithoutDeliveryFee= cartTotal - 15

        // * discountAmmount = if(cartTotal ~ discount < max discount) cartTotal ~ discount : max discount
		const discountAmount =
			cartTotalWithoutDeliveryFee * (0.01 * coupon.discount_percentage) < coupon.max_discount_amount
				? (cartTotalWithoutDeliveryFee * (0.01 * coupon.discount_percentage)).toFixed(2)
				: coupon.max_discount_amount.toFixed(2);

console.log(cartTotal , discountAmount, cartTotal - discountAmount)
		return res.status(HTTP_RES.OK).json({
			message: "Coupon is valid and applicable",
			data: {
				discountPercentage: coupon.discount_percentage,
				maxDiscountAmount: coupon.max_discount_amount,
				code: code,
                discountedTotal : (cartTotal - discountAmount).toFixed(2), // * here cartTotal = ( cartTotalWithoutDelivery + Deliveryfee) ~ - discountAmount
				discountAmount,
				discountPercentageApplied: ((Number(discountAmount) / (cartTotalWithoutDeliveryFee)) * 100).toFixed(2),
			},
			status: "success",
		});
	} catch (error) {
		next(error);
	}
};
