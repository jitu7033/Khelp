import User from "../models/user.models.js"

export const findUserByEmail = async (email, selectPassword = false) => {
    return selectPassword ? User.findOne({ email }).select("+password") : User.findOne({ email });
}

export const createUser = async (userData) => {
    return User.create(userData);
}