import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { findUserByEmail } from "../services/user.service.js";


export const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) res.status(400).json({ message: "You need to login first " });
        const decode = jwt.verify(token, process.env.JWT_KEY);
        let user = await findUserByEmail(decode.email);
        req.sessionId = decode.token;
        if (user.role == "user") {
            req.user = user;
        }
        else if (user.role == "admin") {
            req.admin = user;
        }
        next();
    }
    catch (error) {
        throw new ApiError(500, "internal server error ", error);
    }
}