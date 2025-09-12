import { User } from "../../models/user.model.js";
import { getAllUsersService } from "../../services/admin/user-management.service.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const query = req.query;
    

        const users = await getAllUsersService(query)

        res.json(users);
    } catch (error) {
        next(error);
    }
};
