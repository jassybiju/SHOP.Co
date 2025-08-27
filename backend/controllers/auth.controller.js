import client from "../config/redisClient.js";
import { User } from "../models/user.model.js";
import { sendOTPMail } from "../utils/nodemailer.js";
import { generateOtp } from "../utils/otp.js";

export const registerUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = generateOtp();

    //senting otp and saving in redis cache
    await Promise.all([
      client.setEx(email, 300, JSON.stringify({ user: req.body, otp: otp })),
      sendOTPMail(email, otp),
    ]);

    await res.json({ data: req.body, status: "success" });
  } catch (error) {
    console.log(error);
    res.json({ message: error, status: "error" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp_code } = req.body;
    //getting otp from redis cache
    const {otp : OTP, user} = JSON.parse(await client.get(email))
    console.log(OTP, user, otp_code, OTP == otp_code)
    //res on otp expires
    if (OTP === null) {
      res.status(400).json({ message: "OTP Expired", status: "error" });
    }
    //res on invalid otp
    if (OTP != otp_code) {
      res.status(400).json({ message: "Invalid OTP", status: "error" });
    }

    //create a new user
    await User.create(user)
    res.status(201).json('hi')
  } catch (error) {
    res.send(error)
  }
};
