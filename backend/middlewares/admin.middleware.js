import { User } from "../models/user.model.js";

export const checkAdminRole = async (req, res, next) => {
    try {
        const email = res.locals.email;
        const user = await User.findOne({ email });

        if(!user){
            throw new Error("user not authenticated")
        }
        if(user.role !== 'admin'){
            res.status(401)
            throw new Error("User not Authorised")
        }
        next()
    } catch (error) {
        next(error)
    }
};
