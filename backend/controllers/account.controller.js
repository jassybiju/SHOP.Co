import mongoose from "mongoose";
import { Address } from "../models/address.model.js";
import { User } from "../models/user.model.js";
import {
    addAddressService,
    changeEmailService,
    changePasswordService,
    editAddressService,
    editProfileService,
    setToPrimaryAddressService,
} from "../services/account.service.js";
import { uploadImages } from "../utils/cloudinary.js";
import { addressValidator } from "../validators/account/addressValidator.js";
import { editProfileValidator } from "../validators/account/editProfileValidator.js";
import {
    changePasswordValidator,
    emailValidator,
} from "../validators/userValidator.js";
import { Coupon } from "../models/coupon.model.js";
import { HTTP_RES } from "../utils/CONSTANTS.js";

export const editPrfileController = async (req, res, next) => {
    try {
        const { value, error } = editProfileValidator(req.body);
        if (error) {
            throw error;
        }
        const email = req.email;
        const uploadUrl = await uploadImages(req, "user");
        const result = await editProfileService(value, email, uploadUrl[0]);

        res.status(200).json({ status: "success", data: result ,message : "Profile Editted Successfully"});
    } catch (error) {
        next(error);
    }
};

export const changeEmailController = async (req, res, next) => {
    try {
        const { value, error } = emailValidator(req.body);
        if (error) {
            throw error;
        }
        const currentUser = req.email;
        const result = await changeEmailService(value.email, currentUser);

        return res.status(200).json({
            message: "OTP sent successfuly",
            status: "success",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const changePasswordController = async (req, res, next) => {
    try {
        const { value, error } = changePasswordValidator(req.body);
        if (error) {
            throw error;
        }
        const currentUser = req.email;
        await changePasswordService(
            value.password,
            value.old_password,
            currentUser
        );

        return res.status(200).json({
            message: "Password changed successfully",
            status: "success",
        });
    } catch (error) {
        next(error);
    }
};

export const addAddressController = async (req, res, next) => {
    try {
        const { value, error } = addressValidator(req.body);
        if (error) {
            throw error;
        }
        const currentUser = req.email;
        const result = await addAddressService(value, currentUser);

        return res
            .status(201)
            .json({
                data: result,
                message: "Address Created Successfuly",
                status: "success",
            });
    } catch (error) {
        next(error);
    }
};

export const getAllAddressController = async (req, res, next) => {
    try {
        const currentUser = req.email;
        const user = await User.findOne({ email: currentUser });
        if (!user) {
            throw new Error("User not found ");
        }
        const addresses = await Address.find({ user_id: user._id });
        return res
            .status(200)
            .json({
                data: addresses,
                message: "Address Recieved Successfully",
                status: "success",
            });
    } catch (error) {
        next(error);
    }
};

export const getAddressController = async (req, res, next) => {
    try {
        const currentUser = req.email;
        const { id } = req.params;
        const user = await User.findOne({ email: currentUser });
        if (!user) {
            throw new Error("Invalid Request");
        }
        const address = await Address.findById(id);
        if (!address.user_id.equals(user._id)) {
            throw new Error("Un authorized");
        }
        return res
            .status(200)
            .json({
                message: "Address Received Successfuly",
                data: address,
                status: "success",
            });
    } catch (error) {
        next(error);
    }
};

export const deleteAddressController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentUser = req.email;
        const user = await User.findOne({ email: currentUser });
        const address = await Address.findOne({ _id: id });
        console.log(address.user_id.equals(user._id));
        if (!address) {
            throw new Error("Invalid Address");
        }
        if (!address.user_id.equals(user._id)) {
            throw new Error("Not Allowed");
        }
        await Address.deleteOne({ _id: id });

        return res
            .status(200)
            .json({
                message: "Address deleted Successfully",
                status: "success",
            });
    } catch (error) {
        next(error);
    }
};

export const editAddressController = async (req, res, next) => {
    try {

          const {value , error} = addressValidator(req.body)
          console.log(888)
        if(error){
            throw error
        }
        const currentUser = req.email;
        const { id } = req.params;
        console.log(req.body)
    const address = await editAddressService(id , currentUser , value)
        return res.status(200).json({message : "Address Updated Successfully", data : address, status : 'success'})
    } catch (error) {
        next(error);
    }
};

export const setToPrimaryAddressController = async(req, res, next) => {
    try {
        const currentUser = req.email
        const {id} = req.params

        const address = await setToPrimaryAddressService(currentUser , id)

        return res.status(200).json({message : "Address set as primary successful", data : address , status: "success"})
    } catch (error) {

        next(error)
    }
}


export const getCouponsController = async(req, res, next) => {
    try {
        const user = req.user._id
        
        console.log(user)
        const coupons = await Coupon.find({for_user : user.toString(), is_active : true})
        console.log(coupons)
        return res.status(HTTP_RES.OK).json({message : "Coupon Recieved Successfully",data : coupons , status : "success"})
    } catch (error) {
        next(error)
    }
}