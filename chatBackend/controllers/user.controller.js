
import { HttpStatus } from "../constant/httpStatus.js";
import { OTP } from "../models/otp.model.js";
import Session from "../models/session.model.js";
import User from "../models/user.models.js";
import { generateOTP, getOtpByEmail } from "../services/otp.service.js";
import { sendOtpEmail } from "../services/sendEmail.js";
import { findSessionBySessionId } from "../services/session.service.js";
import { findUserByEmail, createUser } from "../services/user.service.js";
import { ApiError } from "../utils/apiError.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import sendResponse from "../utils/sendResponse.js";
import { generateToken } from "../utils/token.js";
import crypto from "crypto";

export const registeruser = async (req, res) => {
    try {
        const { email, password, name, username } = req.body;

        const existUser = await User.find({
            email: email.toLowerCase(),
            isEmailVerified: true
        });

        if (existUser.length != 0) throw new ApiError(409, "User already Exist")

        const hashedPassword = await hashPassword(password, 10);

        const user = await createUser({
            email,
            password: hashedPassword,
            name, username,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 mins
        })
        const otp = await generateOTP(user._id, "VERIFY_EMAIL");
        await sendOtpEmail(email, otp);

        return sendResponse(res, {
            statusCode: 201,
            message: "User created successfully",
            data: { user }
        });

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "internal server error ", error);
    }
}
export const verifyEmailOtp = async (req, res, next) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({
            email
        });
        console.log(user);
        if (!user) {
            throw new ApiError(HttpStatus.NOT_FOUND, "Invalid request")
        }
        const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
        const otpRecord = await getOtpByEmail(user, otpHash, "VERIFY_EMAIL");

        if (user.isEmailVerified == true) {
            throw new ApiError(HttpStatus.BAD_REQUEST, "User already verified");
        }

        if (!otpRecord) {
            throw new ApiError(HttpStatus.BAD_REQUEST, "Otp not matched");
        }

        user.isEmailVerified = true;
        await user.save();
        await OTP.deleteMany({ userId: user._id })

        sendResponse(res, {
            statusCode: HttpStatus.OK,
            message: "user verification and database creation  ",
            data: user
        })
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email, true);
        if (!user) sendResponse(res, { statusCode: 400, message: "user not found" })

        const matchedPassword = comparePassword(password, user.password);

        console.log(user);
        if (!matchedPassword) throw new ApiError(400, "password not matched ");
        const sessionId = crypto.randomUUID();
        const jwtToken = generateToken(user, sessionId);
        await Session.create({
            user_id: user._id,
            sessionId,
            userAgent: req.headers["user-agent"],
            ip: req.ip,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })
        return sendResponse(res, {
            statusCode: 201,
            message: "User loggedIn successfully",
            data: {
                user: user,
                token: jwtToken,
                sessionId
            }
        });
    }
    catch (error) {
        throw new ApiError(500, "internal server error ", error);
    }
}

export const logout = async (req, res) => {

    try {
        const sessionId = req.sessionId;
        const isActiveSession = await findSessionBySessionId(sessionId);
        const user = req.user;
        if (!isActiveSession) {
            return sendResponse(res, {
                statusCode: 400,
                message: "No logged in session ",
                data: {
                    sessionId: sessionId
                }
            });
        }
        await isActiveSession.deleteOne({ sessionId });
        isActiveSession.save()
        return sendResponse(res, {
            statusCode: 201,
            message: "Logout successfully",
            data: {
                user: user
            }
        })
    } catch (error) {
        throw new ApiError(500, "internal server error ", error);
    }
}

/**
 * update user password or change password 
 */

export const changeUserPassword = async (req, res) => {
    try {
        const user = req.user;
        const sessionId = req.sessionId;
        const verifiedSession = await findSessionBySessionId(sessionId);
        if (!verifiedSession) return sendResponse(res, {
            statusCode: 400,
            message: "no session logged In"
        })
        const { oldPassword, newPassword } = req.body;
        const userWithPassword = await findUserByEmail(user.email, true);

        const isMatched = await comparePassword(oldPassword, userWithPassword.password);
        if (!isMatched) {
            throw new ApiError(400, "old password are not matched ");
        }
        const userId = userWithPassword._id;
        const currentPassword = await hashPassword(newPassword);
        await Promise.all([
            // update password 
            User.updateOne({ _id: userId }, { $set: { password: currentPassword } }),
            // delete all other session 
            Session.deleteMany({ user_id: userId, sessionId: { $ne: req.sessionId } })
        ])

        return sendResponse(res, {
            statusCode: 201,
            message: "password changed successfully",
        })

    }

    catch (error) {
        console.log(error);
        throw new ApiError(500, error);
    }

}