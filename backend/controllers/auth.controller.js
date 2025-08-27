import client from "../config/redisClient.js";
import { User } from "../models/user.model.js";
import { sendOTPMail } from "../utils/nodemailer.js";
import { generateOtp } from "../utils/otp.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    console.log(user);
    if (user && user.is_verified) {
      res.status(400);
      return next(new Error("User already exists"));
    } else if (user) {
      await User.findOneAndDelete({ email: email });
    }

    const otp = generateOtp();

    //senting otp and saving in redis cache
    await Promise.all([
      client.setEx(email, 3600, JSON.stringify({ otp: otp, otp_count: 0 })),
      sendOTPMail(email, otp),
      User.create({ ...req.body, is_verified: false }),
    ]);

    await res.json({ message: "OTP sent successfully", status: "success" });
  } catch (error) {
    console.log(error);
    return next(new Error(error));
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp_code } = req.body;
    const cache_data = await client.get(email);

    if (!cache_data) {
      res.status(404);
      return next(new Error("OTP expired or doesnt exists"));
    }

    //getting otp from redis cache
    const { otp, otp_count } = JSON.parse(cache_data);
    console.log(otp, otp_count, otp == otp_code);

    if (otp_count === 3) {
      await client.del(email);
      res.status(400);
      return next(new Error("OTP count limit reached, Resend OTP"));
    }
    //res on invalid otp
    if (otp != otp_code) {
      console.log(123);
      await client.set(
        email,
        JSON.stringify({ otp, otp_count: otp_count + 1 }),
        "KEEPTTL"
      );
      res.status(400);
      return next(new Error("Invalid OTP"));
    }

    await client.del(email);
    //create a new user
    const newUser = await User.findOneAndUpdate(
      { email: email },
      { $set: { is_verified: true } }
    );
    res.status(201).json({
      message: "User created Successfully",
      data: newUser,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const resendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const cache = await client.get(email);
    if (cache) {
      await client.del(email);
    }

    const otp_code = generateOtp();
    //senting otp and saving in redis cache
    await Promise.all([
      client.setEx(email, 60, JSON.stringify({ otp: otp_code, otp_count: 0 })),
      sendOTPMail(email, otp_code),
    ]);
    res.status(200);
    res.json({ message: "OTP resend successful", status: "success" });
  } catch (error) {
    next(error);
  }
};
