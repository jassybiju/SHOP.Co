import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { getHomeDataService, getProductDataService, getSearchDataService } from "../services/home.service.js";
import cloudinary from "../utils/cloudinary.js";
import { verifyToken } from "../utils/jwt.js";
import { searchValidator } from "../validators/searchValidator.js";

export const getHomeData = async (req, res, next) => {
	try {
		const cookie = req.cookies.jwt;

		let user;
		if (cookie) {
			const data = verifyToken(cookie);
			user = await User.findOne({ email: data.email });
		}

		const products = await getHomeDataService(user);

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
		console.log(req.query);
		const cookie = req.cookies.jwt;

		let user;
		if (cookie) {
			const data = verifyToken(cookie);
			user = await User.findOne({ email: data.email });
		}
		const { value, error } = searchValidator(req.query);
		if (error) {
			res.status(404);
			throw error;
		}
		const products = await getSearchDataService(value, user);
		res.json(products);
	} catch (error) {
		next(error);
	}
};

export const getProductData = async (req, res, next) => {
	try {
		const { id: productId } = req.params;
		const product = await getProductDataService(productId);
		res.json(product);
	} catch (error) {
		next(error);
	}
};
