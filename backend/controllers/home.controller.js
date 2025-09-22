import { Product } from "../models/product.model.js";
import cloudinary from "../utils/cloudinary.js";

export const getHomeData = async (req, res, next) => {
    try {
        const product_aggregation_pipeline = [
            { $match: { is_active: true } },
            {
                $facet: {
                    new_arrivals: [{ $sort: { createdAt: -1 } }, { $limit: 4 }],
                    top_selling: [{ $sort: { createdAt: 1 } }, { $limit: 4 }],
                },
            },
        ];
        const products = await Product.aggregate(product_aggregation_pipeline);

        products[0].new_arrivals = products[0].new_arrivals.map((x) =>
            ({...x , images : x.images.map((img) => ({
                is_main: img?.is_main,
                url: cloudinary.url(img?.url, { secure: true }),
            }))})
            
        );
        products[0].top_selling = products[0].new_arrivals.map((x) =>
            ({...x , images : x.images.map((img) => ({
                is_main: img?.is_main,
                url: cloudinary.url(img?.url, { secure: true }),
            }))})
            
        );
        console.log(products, 1234);
        res.status(200).json({
            message: "Data recieved",
            status: "success",
            data: products[0],
        });
    } catch (error) {
        next(error);
    }
};
