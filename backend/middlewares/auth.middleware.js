import { verifyToken } from "../utils/jwt.js"

export const authenticateUser = (req, res, next) => {
    try {
        const cookie = req.cookies.jwt
        console.log(123)
        const data = verifyToken(cookie)
        res.locals.email = data.email
        next()
    } catch (error) {
        next(error)
    }
}