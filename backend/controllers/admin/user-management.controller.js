import { Order } from "../../models/order.model.js";
import { User } from "../../models/user.model.js";
import { getAllUsersService } from "../../services/admin/user-management.service.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const query = req.query;
        console.log(query)

        const users = await getAllUsersService(query)

        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const getUsersById = async(req, res, next)=>{
    try{
        const {id} = req.params
        const user = await User.findById(id).lean()
        const totalOrders  = await Order.countDocuments({user_id : user._id})
        console.log(user)
        res.status(200).json({message : "User Details got succeffult", status : "success" , data : {...user, totalOrders}})
    }catch(error){
        next(error)
    }
}

export const toggleUserState = async (req, res, next) => {
    try {
        const {id} = req.params
        console.log(req.params)
        const user = await User.findById(id)
        if(!user){
            res.status(404)
            throw new Error("User not Exists")
        }
        user.active = !user.active
        await user.save()

        res.status(200).json({message : "User Status Toggled Successfuly", status : 'success'})

    } catch (error) {
        next(error)
    }
}