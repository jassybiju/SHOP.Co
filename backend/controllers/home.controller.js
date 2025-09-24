import { Product } from "../models/product.model.js";
import { getHomeDataService, getSearchDataService } from "../services/home.service.js";
import cloudinary from "../utils/cloudinary.js";
import { searchValidator } from "../validators/searchValidator.js";

export const getHomeData = async (req, res, next) => {
    try {
        
        const products = await getHomeDataService()
        
        res.status(200).json({
            message: "Data recieved",
            status: "success",
            data: products[0],
        });
    } catch (error) {
        next(error);
    }
};

export const getSearchData = async (req, res, next) => {
    try {
        const {value, error} = searchValidator( req.query)
        if(error){
            res.status(404)
            throw error
        }
        const products = await getSearchDataService(value)
        res.json(products)
    } catch (error) {
        next(error)
    }
}