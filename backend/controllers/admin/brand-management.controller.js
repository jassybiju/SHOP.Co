import { Brand } from "../../models/brand.model.js";
import {
    addBrandService,
    editBrandService,
    getAllBrandService,
    getBrandService,
} from "../../services/admin/brand-management.service.js";
import { uploadImages } from "../../utils/cloudinary.js";
import { brandValidator } from "../../validators/brandValidator.js";

export const addBrand = async (req, res, next) => {
    try {
        console.log(req.body.image);
        console.log(req.files)
        const { error, value } = brandValidator(req.body);
        if (error) {
            console.log(error);
            res.status(400);
            throw error;
        }
        if (!req.files || req.files.length === 0) {
            res.status(400);
            throw new Error("Image is required");
        }

        const brand = await addBrandService(req,res, value);
        console.log(brand);
        res.status(201);
        res.json({
            message: "Brand created successfully",
            data: brand,
            status: "success",
        });
    } catch (error) {
        next(error);
    }
};

export const getAllBrand = async (req, res, next) => {
    try {
        const query = req.query;
        const brandRes = await getAllBrandService(query);
        res.status(200).json(brandRes[0]);
    } catch (error) {
        next(error);
    }
};

export const getBrand = async (req, res, next) => {
    try {
        const { id } = req.params;
        const brand = await getBrandService(id);
        res.status(200).json({
            message: "brand found successfully",
            data: brand,
            status: "success",
        });
    } catch (error) {
        next(error);
    }
};

export const editBrand = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = req.body;

        console.log(req);
        console.log(req.body, 3434);
        const { value, error } = brandValidator(query);
        if (error) {
            throw error;
        }
        console.log(value, id);
        const brand = await editBrandService(id, value);
        res.status(200).json({
            message: "brand edited successfully",
            datat: brand,
            status: "success",
        });
    } catch (error) {
        next(error);
    }
};
