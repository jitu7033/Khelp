import jwt from "jsonwebtoken"

export const generateToken = (user, token) => {
    return jwt.sign({ email: user.email, id: user._id, token }, process.env.JWT_KEY);
}