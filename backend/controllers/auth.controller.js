import { oauth2 } from "googleapis/build/src/apis/oauth2/index.js";
import client from "../config/redisClient.js";
import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";
import { Wallet } from "../models/wallet.model.js";
import { OTP_TYPES, OTP_INVALID_TIME, OTP_EXPIRY_TIME, OTP_VERIFY_LIMIT } from "../utils/CONSTANTS.js";
import { oauth2Client } from "../utils/googleClient.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { sendOTPMail } from "../utils/nodemailer.js";
import { generateOtp } from "../utils/otp.js";
import { printKeyValuePair } from "../utils/redis-debug.js";
import axios from "axios";
import { userValidator } from "../validators/userValidator.js";
import cloudinary from "../utils/cloudinary.js";
import { registerService } from "../services/auth.service.js";
import { createWallet } from "../utils/helpers.js";
import { Coupon } from "../models/coupon.model.js";

// Handles user registeration , If user unverified it deletes and recreates
export const registerUser = async (req, res, next) => {
	try {
		const { value, error } = userValidator(req.body);
		if (error) {
			res.status(400);
			throw error;
		}
		const { email } = req.body;

		await registerService(email, value);
		return res.json({
			message: "OTP sent successfully",
			status: "success",
			data: { otp_timer: Date.now() + Number(OTP_INVALID_TIME * 1000) },
		});
	} catch (error) {
		console.log(error);
		return next(error);
	}
};

export const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user || !user.is_verified) {
			res.status(404);
			throw new Error("User not found");
		}
		if (!user.active) {
			res.status(404).cookie("jwt", {
				maxAge: 0,
				sameSite: "None",
				secure: true,
			});
			throw new Error("User Blocked");
		}
		if (user.is_google_login) {
			res.status(400).cookie("jwt", {
				maxAge: 0,
				sameSite: "None",
				secure: true,
			});
			throw new Error("User is Logged In through Google");
		}
		console.log(email, password);

		const isPasswordCorrect = await user.comparePassword(password);
		if (!isPasswordCorrect) {
			res.status(400);
			throw new Error("Incorrect Credentials");
		}
		console.log("logged in");
		return res
			.cookie("jwt", generateToken(email), {
				httpOnly: true,
				secure: true,
				maxAge: 24 * 60 * 60 * 1000,
				path: "/",
				sameSite: "None",
			})
			.status(200)
			.json({
				message: "Logged In successful",
				data: {
					first_name: user.first_name,
					last_name: user.last_name,
					email: user.email,
					role: user.role,
					avatar_url: user?.avatar_url ? cloudinary.url(user.avatar_url, { secure: true }) : null,
				},
			});
	} catch (error) {
		next(error);
	}
};

export const logoutUser = async (req, res, next) => {
	try {
		res.cookie("jwt", "", { maxAge: 0, sameSite: "None", secure: true });
		res.status(200).json({
			message: "Logged Out Successful",
			status: "success",
		});
	} catch (error) {
		next(error);
	}
};

export const verifyOTP = async (req, res, next) => {
	console.log(123);

	try {
		const { email, otp_code, type } = req.body;
		const cache_data = await client.get(`OTP:${email}`);
		console.log(req.body);
		//* CHECKING IF OTP EXISTS
		console.log(cache_data);
		if (!cache_data) {
			console.log("expirye");

			res.status(404);
			throw new Error("OTP expired or doesnt exists");
		}

		//*getting otp from redis cache
		const { otp, otp_count, otp_type, otp_invalid_time } = JSON.parse(cache_data);

		if (type !== otp_type) {
			await client.del(`OTP${email}`);
			res.status(400);
			throw new Error("Invalid OTP verification attempt");
		}

		//* checking if otp timeout
		if (Date.now() > otp_invalid_time) {
			// await client.del(`OTP:${email}`);
			res.status(400);
			throw new Error("OTP Timeout");
		}

		//* Checking if limit exceeded
		if (otp_count >= OTP_VERIFY_LIMIT) {
			await client.set(
				`OTP:${email}`,
				JSON.stringify({
					otp,
					// otp_count:  + 1otp_count,
					otp_type,
					otp_invalid_time: Date.now(),
				}),
				"KEEPTTL"
			);
			res.status(400);
			throw new Error("OTP count limit reached, Resend OTP");
		}
		//res on invalid otp
		if (otp != otp_code) {
			console.log(123);
			await client.set(
				`OTP:${email}`,
				JSON.stringify({
					otp,
					otp_count: otp_count + 1,
					otp_type,
					otp_invalid_time,
				}),
				"KEEPTTL"
			);
			res.status(400);
			throw new Error("Invalid OTP");
		}
		await client.del(`OTP:${email}`);
		console.log(cache_data);
		if (type === OTP_TYPES.SIGN_UP) {
			//create a new user
			const oldUser = await User.findOne({ email });
			if (!oldUser) {
				res.status(404);
				throw new Error("User not found");
			}
			const newUser = await User.findOneAndUpdate({ email: email }, { $set: { is_verified: true } }, { new: true });
			const refferedUser = await User.findOne({ refferal_id: newUser.reffered_by });
            if(refferedUser){
			const couponDetails = {
				name: "Refferal Offer for",
				description: "Flat 20% off on all orders above ₹1000",
				usage_limit: 1,
				min_order_amount: 1000,
				max_discount_amount: 500,
				discount_percentage: 20,
				expiry_date: new Date().setDate(new Date().getDate() + 2),
			};
			await Coupon.create({
				name: "Refferal Offer for " + refferedUser?.email,
				description: "Flat 20% off on all orders above ₹1000",
				usage_limit: 1,
				for_user: refferedUser._id,
				min_order_amount: 1000,
				max_discount_amount: 500,
				discount_percentage: 20,
				expiry_date: new Date().setDate(new Date().getDate() + 2),
			})
            await Coupon.create({
				name: "Refferal Offer for " + newUser.email,
				description: "Flat 20% off on all orders above ₹1000",
				usage_limit: 1,
				for_user: newUser._id,
				min_order_amount: 1000,
				max_discount_amount: 500,
				discount_percentage: 20,
				expiry_date: new Date().setDate(new Date().getDate() + 2),
			})
        }
				// await Coupon.crea    te({ ...couponDetails, for_user: newUser._id });

			await createWallet(newUser._id);
			return res.status(201).json({
				message: "User created Successfully",
				data: newUser,
				status: "success",
			});
		} else if (type === OTP_TYPES.FORGET_PASSWORD) {
			await client.setEx(`otp_verified:${email}`, 300, "true");

			return res.status(200).json({
				message: "OTP Verified, Change password",
				status: "success",
			});
		} else if (type === OTP_TYPES.CHANGE_EMAIL) {
			const change_email_of_user = await client.get(`CHANGE_PASSWORD:${email}`);
			const user = await User.findOne({ email: change_email_of_user });
			user.email = email;
			user.save();

			return res
				.cookie("jwt", generateToken(email), {
					httpOnly: true,
					secure: true,
					maxAge: 24 * 60 * 60 * 1000,
					path: "/",
					sameSite: "None",
				})
				.status(200)
				.json({
					message: "Email Changed Successfully",
					status: "success",
				});
		}
	} catch (error) {
		console.log(error);
		return next(error);
	}
};

export const resendOTP = async (req, res, next) => {
	printKeyValuePair();
	try {
		const { email } = req.body;
		const cache = JSON.parse(await client.get(`OTP:${email}`));
		if (!cache) {
			throw new Error("No OTP found");
		}

		if (Date.now() < cache.otp_invalid_time) {
			res.status(400);
			throw new Error("No Resend until invalid time");
		}

		await client.del(`OTP:${email}`);

		console.log(cache);
		const otp_code = generateOtp();
		console.log(cache, 123);
		//senting otp and saving in redis cache
		await Promise.all([
			client.setEx(
				`OTP:${email}`,
				OTP_EXPIRY_TIME,
				JSON.stringify({
					otp: otp_code,
					otp_count: 0,
					otp_invalid_time: new Date(Date.now()).getTime() + OTP_INVALID_TIME * 1000,
					otp_type: cache.otp_type,
				})
			),
			sendOTPMail(email, otp_code),
		]);

		res.status(200);
		res.json({
			message: "OTP resend successful",
			status: "success",
			data: { otp_timer: Date.now() + Number(OTP_INVALID_TIME * 1000) },
		});
	} catch (error) {
		next(error);
	}
};

export const forgetPassword = async (req, res, next) => {
	printKeyValuePair();
	try {
		const { email } = req.body;
		console.log(1);
		const user = await User.findOne({ email, is_verified: true });
		if (!user) {
			res.status(400);
			throw new Error("No User found with this email Id");
		}
		const is_verified_already_sent = await client.get(`otp_verified:${email}`);
		if (is_verified_already_sent) {
			await client.del(`otp_verified:${email}`);
		}
		const otp_code = generateOtp();
		//senting otp and saving in redis cache
		await Promise.all([
			client.setEx(
				`OTP:${email}`,
				OTP_EXPIRY_TIME,
				JSON.stringify({
					otp: otp_code,
					otp_count: 0,
					otp_type: OTP_TYPES.FORGET_PASSWORD,
					otp_invalid_time: new Date(Date.now()).getTime() + OTP_INVALID_TIME * 1000,
				})
			),
			sendOTPMail(email, otp_code),
		]);
		console.log(otp_code);
		res.status(200).json({
			message: "OTP send successfully",
			status: "success",
			data: { otp_timer: Date.now() + Number(OTP_INVALID_TIME * 1000) },
		});
	} catch (error) {
		next(error);
	}
};

export const resetPassword = async (req, res, next) => {
	await printKeyValuePair();
	try {
		const { email, password, confirm_password } = req.body;
		const cache = await client.get(`otp_verified:${email}`);
		console.log(cache, 1234, req.body);
		if (password !== confirm_password) {
			res.status(400);
			throw new Error("Password not same");
		}

		if (cache === "true") {
			const user = await User.findOne({ email: email });
			if (!user) {
				throw new Error("User not found");
			}
			user.password = password;
			user.is_google_login = false;
			await user.save();
			console.log(user);
			await client.del(`otp_verified:${email}`);
		} else {
			res.status(400);
			throw new Error("Unauthorized");
		}
		return res.json({
			status: "success",
			message: "Password Reset Successful",
		});
	} catch (error) {
		next(error);
	}
};

export const getUserDetails = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		console.log(token);
		if (!token) {
			res.status(401);
			return next("Access Denied");
		}
		const data = verifyToken(req.cookies.jwt);
		const user = await User.findOne({ email: data.email });
        const cart = await Cart.find({user_id : user?._id}).countDocuments()
		console.log(user);
		if (!user) {
			res.status(403).cookie("jwt", "", {
				maxAge: 0,
				sameSite: "None",
				secure: true,
			});
			throw new Error("User Blocked");
		}
		if (!user.active) {
			res.status(403)
				.cookie("jwt", "", {
					maxAge: 0,
					sameSite: "None",
					secure: true,
				})
				.json({
					data: {
						first_name: user.first_name,
						last_name: user.last_name,
						email: user.email,
						role: user.role,
						active: user.active,
						refferal_id: user.refferal_id,
					},
				});
			throw new Error("User Blocked");
		}
		console.log(user);
		res.status(200).json({
			data: {
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				phone: user.phone,
				role: user.role,
				active: user.active,
                cart: cart,
				refferal_id: user.refferal_id,
				avatar_url: user?.avatar_url ? cloudinary.url(user.avatar_url, { secure: true }) : null,
			},
			message: "User details ",
			status: "success",
		});
	} catch (error) {
		res.status(401);
		next(error);
	}
};

export const googleAuth = async (req, res, next) => {
	const { code } = req.query;
	try {
		const googleRes = await oauth2Client.getToken(code);
		oauth2Client.setCredentials(googleRes.tokens);
		const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);
		console.log(userRes);
		const { email, name } = userRes.data;

		const [first_name, last_name] = name.split(" ");
		let user = await User.findOne({ email });
		if (!user) {
			user = await User.create({
				first_name,
				last_name,
				email,
				is_verified: true,
				is_google_login: true,
			});

			createWallet(user._id);
		}
		if (!user.active) {
			res.status(401).json({ message: "User Blocked", status: "error" });
		}
		if (!user?.is_google_login) {
			res.status(400).json({
				message: "Invalid Request : Use email and password",
				status: "error",
			});
		}
		const { _id } = user;
		const token = generateToken(email);
		res.status(200)
			.cookie("jwt", token, {
				maxAge: 24 * 60 * 60 * 1000,
				sameSite: "None",
				secure: true,
			})
			.json({
				status: "success",
				message: "Google Login Success",
				data: user,
			});
	} catch (error) {
		console.log(error);
		next(error);
	}
};
