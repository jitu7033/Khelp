import mongoose from "mongoose";

const otpSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        otpHash: {
            type: String,
            required: true
        },
        purpose: {
            type: String,
            enum: ["VERIFY_EMAIL", "FORGOT_PASSWORD"],
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
)

otpSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 })

export const OTP = mongoose.model("OTP", otpSchema);
