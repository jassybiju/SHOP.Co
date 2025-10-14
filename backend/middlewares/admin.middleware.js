import { User } from "../models/user.model.js";

export const checkAdminRole = async (req, res, next) => {
    try {
        const email = req.email;
        const user = req.user

        if(!user){
            throw new Error("user not authenticated")
        }
        console.log(100000000,user )
        if(!user.active){
            res.status(401)
            res.cookie('jwt','',{maxAge : 0, sameSite : "None", secure : true})
            throw new Error("User Blocked")
        }
        if(user.role !== 'admin'){
            res.status(401)
            res.cookie('jwt','',{maxAge : 0, sameSite : "None", secure : true})
            throw new Error("User not Authorised")
        }

        next()
    } catch (error) {
        next(error)
    }
};
