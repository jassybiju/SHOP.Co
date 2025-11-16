import ErrorWithStatus from "../config/ErrorWithStatus.js";
import { User } from "../models/user.model.js";
import { HTTP_RES } from "../utils/CONSTANTS.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticateUser = async (req, res, next) => {
	try {
		const cookie = req.cookies.jwt;
		console.log(123);
		if (!cookie) ErrorWithStatus( "Unauthorized : No token provided" ,HTTP_RES.UNAUTHORIZED);

		const data = verifyToken(cookie);
		const user = await User.findOne({ email: data.email });

		if (!user) {
			return ErrorWithStatus("Unauthorized : User not found" ,HTTP_RES.UNAUTHORIZED);
		}

		if (!user.active) {
			throw ErrorWithStatus( "Access Denied : User is Blocked " ,HTTP_RES.FORBIDDEN);
		}
		req.user = user;
		req.email = data.email;

		next();
	} catch (error) {
		res.cookie("jwt",'', { maxAge: 0, sameSite: "None", secure: true });
		next(error);
	}
};
