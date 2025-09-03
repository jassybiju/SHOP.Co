import client from "../config/redisClient.js";
import { User } from "../models/user.model.js";
import { OTP_TYPES } from "../utils/CONSTANTS.js";
import { sendOTPMail } from "../utils/nodemailer.js";
import { generateOtp } from "../utils/otp.js";
import { printKeyValuePair } from "../utils/redis-debug.js";

const OTP_INVALID_TIME = process.env.OTP_INVALID_TIME || 120;
const OTP_EXPIRY_TIME = process.env.OTP_EXPIRY_TIME || 300;
const OTP_VERIFY_LIMIT = process.env.OTP_VERIFY_LIMIT || 3;

export const registerUser = async (req, res, next) => {
  try {
    client.keys("*", function (err, keys) {
      if (err) return console.log(err);
      if (keys) {
        for (var i = 0; i < keys.length; i++) {
          client.get(keys[i], function (error, value) {
            if (err) return console.log(err);
            var job = {};
            job["jobId"] = keys[i];
            job["data"] = value;
            jobs.push(job);
          });
        }
        console.log(jobs);
        res.json({ data: jobs });
      }
    });
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    console.log(user, email);
    if (user && user.is_verified) {
      console.log(1);
      res.status(400);
      return next(new Error("User already exists"));
    } else if (user) {
      await User.findOneAndDelete({ email: email });
    }

    const otp = generateOtp();
    //senting otp and saving in redis cache
    const data = await Promise.all([
      client.setEx(
        `OTP:${email}`,
        OTP_EXPIRY_TIME,
        JSON.stringify({
          otp: otp,
          otp_count: 0,
          otp_invalid_time:
            new Date(Date.now()).getTime() + OTP_INVALID_TIME * 1000,
          otp_type: OTP_TYPES.SIGN_UP,
        })
      ),
      sendOTPMail(email, otp),
    ]);
    await User.create({ ...req.body, is_verified: false });
    console.log(data);
    console.log(await User.findOne({ email }));

    return res.json({ message: "OTP sent successfully", status: "success" });
  } catch (error) {
    console.log(error);
    return next(new Error(error));
  }
};

export const verifyOTP = async (req, res, next) => {
  printKeyValuePair()
  try {
    const { email, otp_code, type } = req.body;
    const cache_data = await client.get(`OTP:${email}`);

    //* CHECKING IF OTP EXISTS
    if (!cache_data) {
      res.status(404);
      return next(new Error("OTP expired or doesnt exists"));
    }

    //*getting otp from redis cache
    const { otp, otp_count, otp_type, otp_invalid_time } =
      JSON.parse(cache_data);
    console.log(otp, otp_count, otp == otp_code, otp_code);
    console.log(cache_data);

    //* checking if otp timeout
    if (Date.now() > otp_invalid_time) {
      await client.del(`OTP:${email}`);
      res.status(400);
      return next(new Error("OTP Timeout"));
    }

    //* Checking if limit exceeded
    if (otp_count >= OTP_VERIFY_LIMIT) {
      await client.del(`OTP:${email}`);
      res.status(400);
      return next(new Error("OTP count limit reached, Resend OTP"));
    }
    //res on invalid otp
    if (otp != otp_code) {
      console.log(123);
      await client.set(
        `OTP:${email}`,
        JSON.stringify({ otp, otp_count: otp_count + 1, otp_type }),
        "KEEPTTL"
      );
      res.status(400);
      return next(new Error("Invalid OTP"));
    }
    await client.del(`OTP:${email}`);
    console.log(cache_data);
    if (type === OTP_TYPES.SIGN_UP) {
      //create a new user
      const oldUser = await User.findOne({ email });
      if(!oldUser){
        res.status(404)
        return next(new Error("User not found"))
      }
      const newUser = await User.findOneAndUpdate(
        { email: email },
        { $set: { is_verified: true } },
        { new: true }
      );
      console.log(newUser);
      console.log(123);
      return res.status(201).json({
        message: "User created Successfully",
        data: newUser,
        status: "success",
      });
    } else if (type === OTP_TYPES.FORGET_PASSWORD) {
      await client.setEx(`otp_verified:${email}`, 300, 'true');

      return res
        .status(200)
        .json({ message: "OTP Verified, Change password", status: "success" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const resendOTP = async (req, res, next) => {
  printKeyValuePair()
  try {
    const { email, otp, otp_type } = req.body;
    const cache = JSON.parse(await client.get(`OTP:${email}`));
    if (cache) {
      await client.del(`OTP:${email}`);
    }

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
          otp_invalid_time:
            new Date(Date.now()).getTime() + OTP_INVALID_TIME * 1000,
          otp_type: cache.otp_type,
        })
      ),
      sendOTPMail(email, otp_code),
    ]);

    res.status(200);
    res.json({ message: "OTP resend successful", status: "success" });
  } catch (error) {
    next(error);
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email, is_verified: true });
    if (!user) {
      res.status(400);
      return next(new Error("No User found with this email Id"));
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
        })
      ),
      sendOTPMail(email, otp_code),
    ]);

    res
      .status(201)
      .json({ message: "OTP send successfully", status: "success" });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  printKeyValuePair()
  try {
    const { email, new_password } = req.body;
    const cache = await client.get(`otp_verified:${email}`);
    if (cache === 'true') {
      console.log("Password Change");
      await client.del(`otp_verified:${email}`)
    } else {
      res.status(400);
      return next(new Error("OTP not verified"));
    }
    return res.json({status : 'success'})
  } catch (error) {
    next(error);
  }
};
