import ErrorWithStatus from "../config/ErrorWithStatus.js";
import client from "../config/redisClient.js";
import { User } from "../models/user.model.js";
import { HTTP_RES, OTP_EXPIRY_TIME, OTP_INVALID_TIME, OTP_TYPES } from "../utils/CONSTANTS.js";
import { sendOTPMail } from "../utils/nodemailer.js";
import { generateOtp } from "../utils/otp.js";

export const registerService = async (email, data) => {

	const user = await User.findOne({ email: email });
	console.log(user, email);
	if (user && user.is_verified) {
		console.log(1);
		throw new Error("User already exists");
	} else if (user) {
		await User.findOneAndDelete({ email: email });
	}
    if(data.refferal_code){
        const refferedUser = await User.findOne({refferal_id : data.refferal_code})
        if(!refferedUser) throw new ErrorWithStatus("Invalid Referral Code", HTTP_RES.BAD_REQUEST)

        data.reffered_by = refferedUser.refferal_id
    }
    const {refferal_code , ...rest} = data
    void refferal_code
	await User.create({ ...rest, is_verified: false });

	const otp = generateOtp();
	//senting otp and saving in redis cache
	await Promise.all([
		client.setEx(
			`OTP:${email}`,
			OTP_EXPIRY_TIME,
			JSON.stringify({
				otp: otp,
				otp_count: 0,
				otp_invalid_time: new Date(Date.now()).getTime() + OTP_INVALID_TIME * 1000,
				otp_type: OTP_TYPES.SIGN_UP,
			})
		),
		sendOTPMail(email, otp),
	]);

	console.log(OTP_EXPIRY_TIME, OTP_INVALID_TIME);
};
