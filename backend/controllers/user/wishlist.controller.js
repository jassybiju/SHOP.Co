import { ProductVariant } from "../../models/product_variants.model.js";
import { Product } from "../../models/product.model.js";
import ErrorWithStatus from "../../config/ErrorWithStatus.js";
import { HTTP_RES } from "../../utils/CONSTANTS.js";
import { Wishlist } from "../../models/wishlist.model.js";
import mongoose from "mongoose";
import cloudinary from "../../utils/cloudinary.js";
export const addWishlistController = async (req, res, next) => {
	try {
		const currentUser = req.user;
		const { variant_id } = req.body;

		const product = await Product.findOne({ _id: variant_id }).populate({
			path: "category_id",
			model: "Category",
		});

		console.log(product, variant_id);
		console.log(product, product.is_active, product.category_id.is_active);
		if (!product || !product.is_active || !product.category_id.is_active) {
			throw new ErrorWithStatus("Invalid Requrest", HTTP_RES.BAD_REQUEST);
		}

		const existingVariantInWishlist = await Wishlist.findOne({ user_id: currentUser._id, product_id: variant_id });
        console.log(Boolean(existingVariantInWishlist),885)
		if (existingVariantInWishlist) {
			await Wishlist.findByIdAndDelete(existingVariantInWishlist._id);
            return res.status(HTTP_RES.ACCEPTED).json({ message: "Wishlist removed", status: "success",  });
		} else {
			const wishlist = await Wishlist.create({
				product_id: variant_id,
				user_id: currentUser._id,
			});

			return res.status(HTTP_RES.CREATED).json({ message: "Wishlist added", status: "success", data: wishlist });
		}
	} catch (error) {
		next(error);
	}
};

export const removeWishlistController = async (req, res, next) => {
	try {
		const currentUser = req.user;
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) throw new ErrorWithStatus("Cart Id is invlaid", HTTP_RES.BAD_REQUEST);

		const wishlist = await Wishlist.findOne({ _id: id });
		if (!wishlist.user_id.equals(currentUser._id)) {
			throw new ErrorWithStatus("Invalid Request", HTTP_RES.BAD_REQUEST);
		}

		await Wishlist.findOneAndDelete({ _id: id });
		return res.status(HTTP_RES.OK).json({ message: "Wishlist Item remvoed Successfully", status: "success" });
	} catch (error) {
		next(error);
	}
};

export const getAllWishlistController = async (req, res, next) => {
	try {
		const user = req.user;

		const wishlistItems = await Wishlist.find({ user_id: user._id })
			.populate({
				path: "product_id",
				populate: {
					path: "category_id",
					select: "is_active discount",
				},
				select: "is_active images name price discount",
			})
			.lean();
		const simplifiedWishlistItems = wishlistItems.map((x) => {
			const product = x.product_id;
			return {
				_id: x._id,
                discount : product.discount > product.category_id.discount ? product.discount : product.category_id.discount,
				product_id: product._id,
				name: product.name,
				price: product.price,
				image: cloudinary.url(product.images?.[0]?.url || null, {
					secure: true,
				}),
			};
		});
		console.log(wishlistItems);
		return res.status(HTTP_RES.OK).json({ data: simplifiedWishlistItems, status: "success", message: "Wishlist item receiveed successfuly" });
	} catch (error) {
		next(error);
	}
};

// export const