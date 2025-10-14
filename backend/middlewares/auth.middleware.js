import { User } from "../models/user.model.js"
import { verifyToken } from "../utils/jwt.js"

export const authenticateUser = async (req, res, next) => {
    try {
        const cookie = req.cookies.jwt
        console.log(123)
        if(!cookie) return res.status(401).json({message : "Unauthorized : No token provided"})

        const data = verifyToken(cookie)
        const user = await User.findOne({email : data.email})

        if(!user){
            return res.status(401).json({message : "Unauthorized : User not found"})
        }

        if(!user.active){
            return res.data(403).json({ message : "Access Denied : User is Blocked "})
        }
        req.user = user
        req.email = data.email

        next()
    } catch (error) {
        next(error)
    }
}