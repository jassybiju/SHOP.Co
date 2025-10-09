import { cartValidator } from "../validators/cartValidator.js"

export const addCartController = async(req, res, next) => {
    try{
        const currentUser = req.email
        const {value, error} = cartValidator(value)
        if(error) throw error

        const result = await addCartService()
    }catch(error){
        next(error)
    }
}