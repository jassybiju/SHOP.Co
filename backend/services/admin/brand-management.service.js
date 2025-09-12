import { Brand } from "../../models/brand.model.js";
import cloudinary, { uploadImages } from "../../utils/cloudinary.js";
import { brandFilterOptions, filterOptions } from "../../utils/CONSTANTS.js";

export const addBrandService = async (req,res, value) => {
    const existingBrand = await Brand.findOne({ name: value.name });
    if (existingBrand) {
        res.status(400);
        throw new Error("Brand name already exists");
    }
    //getting public id of first image
    const uploadResults = (await uploadImages(req))[0];
    console.log({ ...value, image: uploadResults });
    const brand = await Brand.create({ ...value, image: uploadResults });

    return brand;
};

export const getAllBrandService = async (query) => {
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;
    const search = query.search || "";
    const sortField = query.sort || "createdAt";
    const order = query.order === "desc" ? -1 : 1;
    const filterOptions = brandFilterOptions[query.filter] || {};

    if (search) {
        console.log(123343);

        filterOptions.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }
    console.log(filterOptions, query);
    const res = await cloudinary.api.resource("brand/uteulc2x2de1js1lg3iy", {
        colors: true,
    });
    console.log(res.secure_url);
    const aggregationPipeline = [
        {
            $facet: {
                data: [
                    { $match: filterOptions },
                    {$sort :{ [sortField] : order}},
                    { $skip: limit * (page - 1) },
                    { $limit: limit },
                ],
                total_brand_entries: [
                    { $match: filterOptions },
                    { $count: "count" },
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
                                    $arrayElemAt: [
                                        "$total_brand_entries.count",
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
                                            "$total_brand_entries.count",
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
                limit : {$literal : limit},
                page : {$literal : page},
            },
        },
    ];

    const brand = await Brand.aggregate(aggregationPipeline);

    console.log(brand[0].data);
    return brand;
};

export const getBrandService = async (_id) => {
    const brand = await Brand.findOne({ _id });
    if (!brand) {
        throw new Error("No brand found");
    }
    return brand;
};

export const editBrandService = async (_id, data) => {
    console.log(data, 2342);

    const brand = await Brand.findOne({ _id });
    console.log(brand, 234);
    if (!brand) {
        throw new Error("No brand Found");
    }

    const existingWithName = await Brand.findOne({
        name: data.name,
        _id: { $ne: _id },
    });
    if (existingWithName) {
        throw new Error("brand name already exists");
    }

    brand.name = data.name;
    brand.description = data.description;

    await brand.save();

    return brand;
};
