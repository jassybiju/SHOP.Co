import { ProductVariant } from "../../models/product_variants.model.js";
import cloudinary from "../../utils/cloudinary.js";

const FILTER_OPTIONS = {
    lowStock: { stock: { $lt: 10 } },
};

export const getAllProductsStockService = async (query) => {
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;
    const search = query.search || "";
    const sortField = query.sort || "createdAt";
    const order = query.order === "desc" ? -1 : 1;
    const filter = FILTER_OPTIONS[query.filter] || {};

    let searchCondition = {};
    if (search) {
        searchCondition = {
            $or: [
                { "product.name": { $regex: search, $options: "i" } },
                {
                    "category.name": {
                        $regex: search,
                        $options: "i",
                    },
                },
            ],
        };
    }

      const pipeline = [
    {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },

    {
      $lookup: {
        from: "categories",
        localField: "product.category_id",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: "$category" },

    {
      $match: {
        ...filter,
        ...searchCondition,
      },
    },

    { $sort: { [sortField]: order } },    {
      $facet: {
        data: [
          { $skip: limit * (page - 1) },
          { $limit: limit },
          {
            $project: {
              _id: 1,
              variant_sku: 1,
              stock: 1,
              size: 1,
              color: 1,
              is_active: 1,
              price: "$product.price",
              discount: "$product.discount",
              product_name: "$product.name",
              category_name: "$category.name",
              image: { $arrayElemAt: ["$product.images.url", 0] },
              createdAt: 1,
            },
          },
        ],
        totalCount: [{ $count: "count" }],
      },
    },    {
      $project: {
        data: 1,
        total: { $ifNull: [{ $arrayElemAt: ["$totalCount.count", 0] }, 0] },
        limit: { $literal: limit },
        page: { $literal: page },
        totalPages: {
          $ceil: {
            $divide: [
              { $ifNull: [{ $arrayElemAt: ["$totalCount.count", 0] }, 0] },
              limit,
            ],
          },
        },
      },
    },
  ];


  const result = await ProductVariant.aggregate(pipeline)
    const data  = result[0]?.data.map((x) => ({
    ...x,
    image: cloudinary.url(x.image, { secure: true }),
  }));
    // const simplifiedProducts = products.map((variant) => {
    //     const product = variant.product_id;
    //     return {
    //         ...variant,
    //         name: product?.name,
    //         images: cloudinary.url(product?.images?.[0]?.url, { secure: true }),
    //         price: product?.price,
    //         discount: product?.discount,
    //         category_name: product?.category_id?.name,
    //     };
    // });

    return {
            data,
            page,
            limit,
            total: result[0]?.total,
            pages: result[0]?.totalPages,

    };
};
