import { OTP_EXPIRY_MINUTES } from "../constant/constant.js";
import { OTP } from "../models/otp.model.js";
import crypto from "crypto"

export const generateOTP = async (userId, purpose) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    console.log(otp);
    const expiresAt = new Date(
        Date.now() + OTP_EXPIRY_MINUTES * 60 * 100
    )
    await OTP.create({
        userId,
        otpHash, purpose, expiresAt
    })
    return otp;
}

export const getOtpByEmail = async (user, otpHash, purpose) => {
    return await OTP.findOne({ userId: user._id, otpHash, purpose: purpose });
}
