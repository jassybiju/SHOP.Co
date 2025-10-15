import { Category } from "../../models/category.model.js";
import {
    addCategoryService,
    editCategoryService,
    getAllCategoriesService,
    getCategoryService,
} from "../../services/admin/category-management.service.js";
import { categoryValidator } from "../../validators/categoryValidator.js";

export const addCategory = async (req, res, next) => {
    try {
        const { value, error } = categoryValidator(req.body);
        if (error) {
            throw error;
        }
        console.log(12356);
        const category = await addCategoryService(value);
        res.status(201).json({
            message: "Category created successfully",
            data: category,
            status: "success",
        });
    } catch (error) {
        next(error);
    }
};

export const getAllCategories = async (req, res, next) => {
    try {
        const query = req.query;
        const categoriesRes = await getAllCategoriesService(query);
        res.status(200).json(categoriesRes);
    } catch (error) {
        next(error);
    }
};

export const getCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await getCategoryService(id);
        res.status(200).json({
            message: "Category found successfully",
            data: category,
            status: "success",
        });
    } catch (error) {
        next(error);
    }
};

export const editCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = req.body;
        console.log(req.body, 3434);
        const { value, error } = categoryValidator(query);
        if (error) {
            throw error;
        }
        console.log(value, id);
        const category = await editCategoryService(id, value);
        res.status(200).json({
            message: "Category edited successfully",
            datat: category,
            status: "success",
        });
    } catch (error) {
        next(error);
    }
};

export const toggleCategoryStatus = async(req,res,next)=>{
    try {
        const { id } = req.params;

        const category = await Category.findById(id)
        if(!category){
            res.status(404)
            throw new Error("Category Not found")
        }
        category.is_active= !category.is_active
        await category.save()

        res.status(200).json({
            message : 'Category toggled successfully',
        status : 'success'        })
    } catch (error) {
        next(error)
    }
}
