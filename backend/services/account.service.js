import client from "../config/redisClient.js";
import mongoose from "mongoose";
import { Address } from "../models/address.model.js";
import { User } from "../models/user.model.js";
import {
    OTP_EXPIRY_TIME,
    OTP_INVALID_TIME,
    OTP_TYPES,
} from "../utils/CONSTANTS.js";
import { sendOTPMail } from "../utils/nodemailer.js";
import { generateOtp } from "../utils/otp.js";
export const editProfileService = async (data, email, url) => {
    console.log(url);
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    user.first_name = data.first_name;
    user.last_name = data.last_name;
    user.phone = data.phone;

    // if url exists means new image upload save or else save the old one
    user.avatar_url = url ? url : user.avatar_url;
    console.log(user)
    await user.save();

    return user;
};

export const changeEmailService = async (email, currentUser) => {
    const user = await User.findOne({ email: currentUser });
    if (!user) {
        throw new Error("User Not exists");
    }
    const isUserExistsWithEmail = await User.findOne({ email });
    if (isUserExistsWithEmail) {
        throw new Error("User Exists with the same email");
    }
    const otp = generateOtp();

    await Promise.all([
        client.setEx(
            `OTP:${email}`,
            OTP_EXPIRY_TIME,
            JSON.stringify({
                otp: otp,
                otp_count: 0,
                otp_invalid_time:
                    new Date(Date.now()).getTime() + OTP_INVALID_TIME * 1000,
                otp_type: OTP_TYPES.CHANGE_EMAIL,
            })
        ),
        client.setEx(`CHANGE_PASSWORD:${email}`, OTP_EXPIRY_TIME, currentUser),
        sendOTPMail(email, otp),
    ]);
    return { otp_timer: Date.now() + Number(OTP_INVALID_TIME * 1000) };
};

export const changePasswordService = async (
    new_password,
    old_password,
    currentUser
) => {
    const user = await User.findOne({ email: currentUser });
    if (user.is_google_login) {
        throw new Error("Incorrect Password");
    }
    console.log(old_password);
    const isPasswordCorrect = await user.comparePassword(old_password);

    if (!isPasswordCorrect) {
        throw new Error("Incorrect Password");
    }
    user.password = new_password;
    await user.save();
};

export const addAddressService = async (data, currentUser) => {
    const user = await User.findOne({ email: currentUser });
    if (!user) {
        throw new Error("Invalid User");
    }
    const noOfAddresses = await Address.find({ user_id: user._id }).lean();
    console.log(noOfAddresses.length);
    if (noOfAddresses.some((x) => x.address_type.toUpperCase() === data.address_type.toUpperCase())) {
        throw new Error("Address Type already exists");
    }
    if (noOfAddresses.length >= 3) {
        throw new Error(
            "Maximum no of addresses created, Remove or Edit exisiting ones"
        );
    }
    const address = await Address.create({
        ...data,
        user_id: user._id,
        is_primary: noOfAddresses.length === 0,
    });

    return address;
};

export const editAddressService = async (addressId, currentUser, value) => {
    if (!mongoose.Types.ObjectId.isValid(addressId)) {
        throw new Error("Invalid ID");
    }
    const user = await User.findOne({ email: currentUser });
    const address = await Address.findOne({
        _id: addressId,
        user_id: user._id,
    });
    if (!address) {
        throw new Error("Address not found");
    }

    const allAddresses = await Address.find({ user_id: user._id }).lean();
    // console.log(noOfAddresses.length)
    if (
        allAddresses.some(
            (x) =>
                x._id.toString() !== addressId &&
                x.address_type === value.address_type
        )
    ) {
        throw new Error("Address Type already exists");
    }

    console.log(address, value);
    address.set(value);
    const newAddress = await address.save();

    return newAddress;
};

export const setToPrimaryAddressService = async (currentUser, id) => {
    const session = await mongoose.startSession();
    try {
        const user = await User.findOne({ email: currentUser }).session(
            session
        );
        if (!user) throw new Error("User Not found");

        const address = await Address.findOne({
            user_id: user._id,
            _id: id,
        }).session(session);
        if (!address) {
            throw new Error("Address Not found");
        }
        if (address.is_primary) {
            throw new Error("Address is Already set to primay");
        }

        await Address.updateMany(
            { user_id: user._id, is_primary: true },
            { $set: { is_primary: false } },
            { session }
        );

        address.is_primary = true;
        await address.save({ session });
        session.endSession();

        return address
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
