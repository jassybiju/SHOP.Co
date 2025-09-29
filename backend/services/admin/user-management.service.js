import { User } from "../../models/user.model.js";
import { filterOptions } from "../../utils/CONSTANTS.js";

export const getAllUsersService = async (query) => {
    // spliting data from queey
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;
    const search = query.search || "";
    let sortField = query.sort || "createdAt";
    let filter = query.filter || "AllUsers";
    const order = query.order === "desc" ? -1 : 1;

    //getting key from filterOption
    let filterCriteria = filterOptions[filter] || {};

    //If search match condition 
    if (search) {
        filterCriteria.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }
    console.log(filterCriteria, filter, limit * page, order, sortField);


    const aggregationPipeline = [
        {
            $facet: {
                total_users: [{ $count: "total" }],
                total_users_entries : [{$match : filterCriteria }, {$count : 'total'}],

                data: [
                      { $match: filterCriteria },
                    { $sort: { [sortField]: order } },
                    { $skip: limit * (page - 1) },
                    { $limit: limit },
                    { $project: { password: 0 } },
                ],
                blocked_users: [
                    { $match: { active: false } },
                    { $count: "count" },
                ],
            },
        },
        {
            $project: {
                data: 1,
                total_users: { $arrayElemAt: ["$total_users.total", 0] },
                blocked_users: {
                    $arrayElemAt: ["$blocked_users.count", 0],
                },
                pages : {$cond : {
                    if : {
                        $gt : [{ $arrayElemAt : ['$total_users_entries.total', 0]} , 0]
                    },then : {
                        $ceil : {
                            $divide : [
                                {
                                    $arrayElemAt : ['$total_users_entries.total', 0]
                                },
                                limit
                            ]
                        }
                    },else : 0
                }},
                page: { $literal: page },
                limit: { $literal: limit },
            },
        },
    ];

    const users = await User.aggregate(aggregationPipeline);
    //since aggregation return is array returning first object
    return users[0];
};
