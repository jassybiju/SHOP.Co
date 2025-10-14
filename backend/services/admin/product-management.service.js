import mongoose from "mongoose";
import { Product } from "../../models/product.model.js";
import cloudinary, { uploadImages } from "../../utils/cloudinary.js";
import { productFilterOptions } from "../../utils/CONSTANTS.js";
import { ProductVariant } from "../../models/product_variants.model.js";
import { Brand } from "../../models/brand.model.js";

export const getAllProductService = async (query) => {
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;
    const search = query.search || "";
    const sortField = query.sort || "createdAt";
    const order = query.order === "desc" ? -1 : 1;
    const filterOptions = productFilterOptions[query.filter] || {};
    console.log(filterOptions)
    if (search) {
        console.log(123343);

        filterOptions.$or = [
            { name: { $regex: search, $options: "i" } },
        ];
    }
    console.log(filterOptions, query, 9997);

    // const res = await cloudinary.api.resource("product/uteulc2x2de1js1lg3iy", {
    //     colors: true,
    // });

    // console.log(res.secure_url);
    const aggregationPipeline = [
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
                    { $match: filterOptions },
                    { $sort: { [sortField]: order } },
                    { $skip: limit * (page - 1) },
                    { $limit: limit },
                ],
                total_product_entries: [
                    { $match: filterOptions },
                    { $count: "count" },
                ],
                total_products : [
                    {$count : 'products'}
                ],
                total_blocked_products : [
                    {$match : {is_active : false}},
                    {$count : 'products'}
                ]
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
                                    $arrayElemAt: [
                                        "$total_product_entries.count",
                                        0,
                                    ],
                                },
                                0,
                            ],
                        },
                        then: {
                            $ceil: {
                                $divide: [
                                    {
                                        $arrayElemAt: [
                                            "$total_product_entries.count",
                                            0,
                                        ],
                                    },
                                    limit,
                                ],
                            },
                        },
                        else: 0,
                    },
                },
                limit: { $literal: limit },
                page: { $literal: page },
                total_products : {$arrayElemAt : ['$total_products.products',0]},
                blocked_products : {$arrayElemAt : ['$total_blocked_products.products',0]}
            },
        },
    ];
    console.log(
        await Product.aggregate([
            {
                $lookup: {
                    from: "productvariants",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "variant",
                },
            },
        ]),
        9999999
    );
    const product = await Product.aggregate(aggregationPipeline);
    console.log(product[0].images);
    return {
        ...product[0],
        data: product[0].data.map((x) => ({
            ...x,
            images: x.images.map((img) => ({
                url: cloudinary.url(img?.url, { secure: true }),
                is_main: img?.is_main,
            })),
        })),
    };
};

export const getProductService = async (_id) => {
    const product = await Product.aggregate([
        { $match: { _id: mongoose.Types.ObjectId.createFromHexString(_id) } },
        {
            $lookup: {
                from: "productvariants",
                foreignField: "product_id",
                localField: "_id",
                as: "variants",
            },
        },
        {
            // ! TODO
            $project: { "variants.product_id": 0 },
        },
    ]);
    console.log(product, 123232);
    if (!product) {
        throw new Error("No Product found");
    }
    console.log(product[0].images, 9998);
    return {
        ...product[0],
        images: product[0].images.map((img) => ({
            is_main: img?.is_main,
            url: cloudinary.url(img?.url, { secure: true }),
        })),
    };
};

export const editProductService = async (_id, data, req) => {
    const product = await Product.findOne({ _id });
    if (!product) throw new Error("No product Found");


    //checking for duplicate product name
    const existingWithName = await Product.findOne({
        name: {$regex : `^${data.name}$` , $options : 'i'},
        _id: { $ne: _id },
    });
    if (existingWithName) throw new Error("Product name already exists");


    // Parsing images data
    data.imagesData = data.imagesData.map((x) => JSON.parse(x));

    //uploading new images in req.files
    const uploadUrls = await uploadImages(req, 'product')
    console.log(uploadUrls , data.imagesData)
    const newImageEntries = data.imagesData.filter(x => x.is_new)
    if(uploadUrls.length !== newImageEntries.length){
        throw new Error('Expected new images is not recieved')
    }

    let uploadedIndex = 0

    const uploadResult = data.imagesData.map((x ,i)=>{
        if(x.is_new){
            return {url : uploadUrls[uploadedIndex++], is_main : i==0}
        }else{
            console.log(product.images)
            return product.images[i]

        }
    })


    // getting all existed variant
    const existingVariants = await ProductVariant.find({product_id :  _id})
    const existingVariantId = existingVariants.map(e => e._id.toString())

    // Updataing and creating new variants
    await Promise.all(
        data.variants.map(async variant => {
            if(variant._id){
                return await ProductVariant.findByIdAndUpdate({_id : variant._id}, {$set : {color : variant.color, size : variant.size , stock : Number(variant.stock)}},{new:true})
            }else{
                return await ProductVariant.create({product_id : _id , color : variant.color, size : variant.size , stock : variant.stock})
            }
        })
    )

    //deleting variants
    const editedVariants = data.variants.filter(x => x._id).map(x => x._id.toString())
    console.log(data.variants,7787)
    const deletingVariants = existingVariantId.filter(x => !editedVariants.includes(x))
    if(deletingVariants.length > 0){
        await ProductVariant.deleteMany({_id : {$in : deletingVariants}})
    }

    if(!await Brand.findOne({_id : data.brand_id})){
        throw new Error("Brand Doesnt exists")
    }

    product.name = data.name;
    product.description = data.description;
    product.small_description = data.small_description;
    product.discount = data.discount;
    product.brand_id = data.brand_id;
    product.category_id = data.category_id;
    product.price = data.price;
    product.images = uploadResult;

    console.log(uploadResult, 99898);

    await product.save();

    return product;
};
