import { Coupon } from "../../models/coupon.model.js";
import { User } from "../../models/user.model.js";
import ErrorWithStatus from "../../config/ErrorWithStatus.js";
import { HTTP_RES } from "../../utils/CONSTANTS.js";

export const addCouponService = async (value) => {
	if (value?.for_user) {
		const user = await User.findOneById(value.for_user);
		if (!user) {
			throw new ErrorWithStatus("No user found", HTTP_RES.NOT_FOUND);
		}
	}
	console.log(value, 123);

	if (value?.code) {
		// * Checking if coupons exists
		const exisitingCoupon = await Coupon.findOne({ code: value.code });
		if (exisitingCoupon)
			throw new ErrorWithStatus("Coupon Code already exists", HTTP_RES.CONFLICT);
	}

	const coupon = await Coupon.create(value);

	return coupon;
};
