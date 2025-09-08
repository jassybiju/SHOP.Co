import jwt from 'jsonwebtoken'

export const generateToken=(email)=> jwt.sign({email : email}, process.env.JWT_SECRET)

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET)