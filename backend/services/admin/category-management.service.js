import ErrorWithStatus from "../../config/ErrorWithStatus.js";
import { Category } from "../../models/category.model.js";
import { HTTP_RES } from "../../utils/CONSTANTS.js";

export const addCategoryService = async (value) => {
    const existinCategory = await Category.findOne({ name: {$regex : `^${value.name}$` , $options : 'i' }  });
    console.log(existinCategory)
    if (existinCategory) {
        throw new ErrorWithStatus("Category name exists",HTTP_RES.CONFLICT);
    }
    const category = await Category.create(value);

    return category;
};

export const getAllCategoriesService = async (query) => {
    // spliting data from queey
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;
    const search = query.search || "";
    let sortField = query.sort || "createdAt";
    const order = query.order === "desc" ? -1 : 1;

    const filterCriteria = {};

    //If search match condition
    if (search) {
        filterCriteria.$or = [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ];
    }
    console.log(filterCriteria, limit * page, order, sortField);

    const aggregationPipeline = [
        {
            $facet: {
                total_categories: [{ $count: "total" }],
                total_entries_after_filter: [
                    { $match: filterCriteria },
                    { $count: "entries" },
                ],
                data: [
                    { $match: filterCriteria },
                    { $sort: { [sortField]: order } },
                    { $skip: limit * (page - 1) },
                    { $limit: limit },
                ],
            },
        },
        {
            $project: {
                data: 1,
                page: { $literal: page },
                pages: {
                    $cond: {
                        if: {
                            $gt: [
                                {
                                    $arrayElemAt: [
                                        "$total_entries_after_filter.entries",
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
                                            "$total_entries_after_filter.entries",
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
                total_categories: {
                    $arrayElemAt: ["$total_categories.total", 0],
                },
            },
        },
    ];
    console.log(aggregationPipeline[0].$facet.data[1])

    const categories = await Category.aggregate(aggregationPipeline);
    console.log(categories);
    //since aggregation return is array returning first object
    return categories[0];
};

export const getCategoryService = async (_id) => {
    const category = await Category.findOne({ _id });
    if (!category) {
        throw new Error("No Category found");
    }
    return category;
};
export const editCategoryService = async (_id, data) => {
    console.log(data, 2342);

    const category = await Category.findOne({ _id });

    if (!category) throw new ErrorWithStatus("No Category Found",HTTP_RES.NOT_FOUND);

    const existingWithName = await Category.findOne({
        name: {$regex : `^${data.name}$` , $options : 'i'},
        _id: { $ne: _id },
    });
    // const existinCategory = await Category.findOne({ name: {$regex : `^${value.name}$` , $options : 'i' }  });

    if (existingWithName)  throw new ErrorWithStatus("Category name already exists",HTTP_RES.CONFLICT);

    category.name = data.name;
    category.description = data.description;
    category.discount = data.discount

    await category.save();

    return category;
};
