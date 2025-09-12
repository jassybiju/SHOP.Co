import { Category } from "../../models/category.model.js";

export const addCategoryService = async (value) => {
    const existinCategory = await Category.findOne({ name: value.name });
    if (existinCategory) {
        throw new Error("Category name exists");
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
    console.log(category, 234);
    if (!category) {
        throw new Error("No Category Found");
    }

    const existingWithName = await Category.findOne({
        name: data.name,
        _id: { $ne: _id },
    });
    if (existingWithName) {
        throw new Error("Category name already exists");
    }

    category.name = data.name;
    category.description = data.description;

    await category.save();

    return category;
};
