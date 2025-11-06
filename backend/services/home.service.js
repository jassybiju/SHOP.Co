import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import cloudinary from "../utils/cloudinary.js";
import { Brand } from "../models/brand.model.js";
import { Category } from "../models/category.model.js";

export const getHomeDataService = async (user) => {
    const wishlistLookup = {
        $lookup : {
            from : "wishlists",
            let : {productId : "$_id"},
            pipeline : [
                {
                    $match : {
                        $expr : {
                            $and : [
                                {$eq : ['$product_id',"$$productId"]},
                                ...(user && user._id ? [{ $eq : ['$user_id' , user._id]}] : [{$eq : [0,1]}])
                            ]
                        }
                    }
                }
            ],
            as : "wishlist"
        }
    }
	const product_aggregation_pipeline = [
		{ $match: { is_active: true } },
		{
			$facet: {
				new_arrivals: [{ $sort: { createdAt: -1 } }, { $limit: 4 },wishlistLookup, {$addFields : {isWishlisted : {$gt : [{$size :
                    '$wishlist'
                },0]}}}],
				top_selling: [{ $sort: { createdAt: 1 } }, { $limit: 4 }],
			},
		},
	];
	const products = await Product.aggregate(product_aggregation_pipeline);

	// TODO modify new arriaval and top_selling
	products[0].new_arrivals = products[0].new_arrivals.map((x) => ({
		...x,
		images: x.images.map((img) => ({
			is_main: img?.is_main,
			url: cloudinary.url(img?.url, { secure: true }),
		})),
	}));
	products[0].top_selling = products[0].new_arrivals.map((x) => ({
		...x,
		images: x.images.map((img) => ({
			is_main: img?.is_main,
			url: cloudinary.url(img?.url, { secure: true }),
		})),
	}));
	return products;
};

export const getSearchDataService = async (query, user) => {
	const filterOptions = {
		is_active: true,
	};

	console.log(query);

	if (query.price_min || query.price_max) {
		// Remove raw price filter
		delete filterOptions.price;

		const priceConditions = [];

		if (query.price_min !== undefined) {
			priceConditions.push({
				$gte: [
					{
						$subtract: [
							"$price",
							{
								$multiply: ["$price", { $divide: ["$discount", 100] }],
							},
						],
					},
					query.price_min,
				],
			});
		}

		if (query.price_max !== undefined) {
			priceConditions.push({
				$lte: [
					{
						$subtract: [
							"$price",
							{
								$multiply: ["$price", { $divide: ["$discount", 100] }],
							},
						],
					},
					query.price_max,
				],
			});
		}

		// Combine conditions under $and
		filterOptions.$expr = { $and: priceConditions };
	}

	if (query.size)
		filterOptions["variants.size"] = {
			$in: Array.isArray(query.size) ? [...query.size] : [query.size],
		};
	if (query.color)
		filterOptions["variants.color"] = {
			$in: Array.isArray(query.color) ? [...query.color] : [query.color],
		};

	if (query.q) {
		filterOptions.$or = [{ name: { $regex: query.q, $options: "i" } }, { small_description: { $regex: query.q, $options: "i" } }];
	}
	if (query.brand) {
		const queryBrand = Array.isArray(query.brand) ? query.brand?.map((x) => new RegExp(x, "i")) : [new RegExp(query.brand, "i")];
		const brand = await Brand.find(
			{
				name: {
					$in: queryBrand,
				},
			},
			{ _id: 1 }
		);
		if (brand.length !== 0) {
			filterOptions.brand_id = { $in: [...brand.map((x) => x._id)] };
		}

		// ! If wanna throw an Error
		// else {
		//     throw new Error("Invalid Brand");
		// }
	}
	console.log(query.color);

	if (query.category) {
		const queryCategories = Array.isArray(query.category) ? query.category?.map((x) => new RegExp(x, "i")) : [new RegExp(query.category, "i")];
		const category = await Category.find(
			{
				name: {
					$in: queryCategories,
				},
			},
			{ _id: 1 }
		);
		if (category.length !== 0) {
			filterOptions.category_id = {
				$in: [...category.map((x) => x._id)],
			};
		}

		// ! If wanna throw an Error
		// else {
		//     throw new Error("Invalid Category");
		// }
	}
	const allBrands = await Brand.find({}, { name: 1, _id: 0 }).sort({
		name: 1,
	});
	const allCategories = await Category.find({}, { name: 1, _id: 0, is_active: 1 }).sort({
		name: 1,
	});

	const wishlistLookup = {
	$lookup: {
            from: "wishlists",
            let: { productId: "$_id" },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$product_id", "$$productId"] },
                                // Only match user ID if available, otherwise force empty array
                                ...(user && user._id ? [{ $eq: ["$user_id", user._id] }] : [{ $eq: [0, 1] }]),
                            ],
                        },
                    },
                },
                { $project: { _id: 1 } }
            ],
            as: "wishlist",
        },
	};

	const product_aggregation_pipeline = [
		{
			$facet: {
				data: [
					{
						$lookup: {
							from: "productvariants",
							localField: "_id",
							foreignField: "product_id",
							as: "variants",
						},
					},
					wishlistLookup,
                    {
                        $lookup  : {
                            from : 'categories',
                            localField : 'category_id',
                            foreignField: '_id',
                            as : 'category'
                        }
                    },
					{ $unwind: "$category" }, // make category an object instead of array
					{
						$match: {
							...filterOptions,
							"category.is_active": true, // exclude products with inactive category
						},
					},
					{
						$sort: {
							[query.sort]: query.order === "desc" ? -1 : 1,
						},
					},
					{ $skip: (query.page - 1) * query.limit },
					{ $limit: query.limit },
				],
				variantsInfo: [
					{ $match: { is_active: true } },
					{
						$lookup: {
							from: "productvariants",
							localField: "_id",
							foreignField: "product_id",
							as: "variants",
						},
					},
					{ $unwind: "$variants" },
					{
						$group: {
							_id: null,
							colors: { $addToSet: "$variants.color" },
							sizes: { $addToSet: "$variants.size" },
						},
					},
				],
				total_product_entries: [
					{
						$lookup: {
							from: "productvariants",
							localField: "_id",
							foreignField: "product_id",
							as: "variants",
						},
					},
					{ $match: filterOptions },
					{ $count: "count" },
				],
				priceInfo: [
					{ $match: { is_active: true } }, // or filterOptions if you want filtered prices
					{
						$group: {
							_id: null,
							minPrice: {
								$min: {
									$subtract: [
										"$price",
										{
											$multiply: ["$price", { $divide: ["$discount", 100] }],
										},
									],
								},
							},
							maxPrice: { $max: "$price" },
						},
					},
				],
			},
		},
		{
			$project: {
				data: 1,
				pages: {
					$cond: {
						if: {
							$gt: [
								{
									$arrayElemAt: ["$total_product_entries.count", 0],
								},
								0,
							],
						},
						then: {
							$ceil: {
								$divide: [
									{
										$arrayElemAt: ["$total_product_entries.count", 0],
									},
									query.limit,
								],
							},
						},
						else: 0,
					},
				},
				limit: { $literal: query.limit },
				page: { $literal: query.page },
				allBrands: { $literal: allBrands.map((x) => x?.name) },
				allCategories: { $literal: allCategories.filter((x) => x.is_active).map((x) => x?.name) },
				allColors: { $arrayElemAt: ["$variantsInfo.colors", 0] },
				allSizes: { $arrayElemAt: ["$variantsInfo.sizes", 0] },
				minPrice: { $arrayElemAt: ["$priceInfo.minPrice", 0] },
				maxPrice: { $arrayElemAt: ["$priceInfo.maxPrice", 0] },
			},
		},
	];

	const products = await Product.aggregate(product_aggregation_pipeline);
	console.log(products);
	return {
		...products[0],
		data: products[0].data.map((x) => ({
			...x,
			images: x.images.map((imgobj) => ({
				...imgobj,
				url: cloudinary.url(imgobj?.url, { secure: true }),
			})),
		})),
	};
};

export const getProductDataService = async (productId) => {
	if (!mongoose.Types.ObjectId.isValid(productId)) {
		throw new Error("Invalid Object Id");
	}

	const product = await Product.aggregate([
		{
			$match: {
				_id: mongoose.Types.ObjectId.createFromHexString(productId),
				is_active: true,
			},
		},
		{
			$lookup: {
				from: "wishlists",
				localField: "_id",
				foreignField: "product_id",
				as: "wishlist",
			},
		},
		{
			$lookup: {
				from: "categories",
				localField: "category_id",
				foreignField: "_id",
				as: "category",
			},
		},
		{ $unwind: "$category" }, // convert array to object
		{
			$match: {
				"category.is_active": true, // ensure category is active
			},
		},
		{
			$lookup: {
				from: "productvariants",
				localField: "_id",
				foreignField: "product_id",
				as: "variants",
			},
		},
	]);

	if (!product[0]) {
		throw new Error("No Product or Category Inactive");
	}

	const products = await Product.find({ is_active: true }).limit(4).lean(); // optionally add category filter

	return {
		...product[0],
		images: product[0].images.map((x) => ({
			...x,
			url: cloudinary.url(x.url, { secure: true }), // fixed typo 'sercure'
		})),
		discount: product[0].discount > product[0].category.discount ? product[0].discount : product[0].category.discount,

		ratings: [],
		products: products.map((x) => ({
			...x,
			images: x.images.map((img) => ({
				...img,
				url: cloudinary.url(img.url, { secure: true }),
			})),
		})),
	};
};
