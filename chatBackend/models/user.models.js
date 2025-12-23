import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            unique: true,
            index: true
        },
        avatar: String,

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
            ,
            index: true
        },
        status: {
            type: String,
            enum: ["online", "offline", "away"],
            default: "offline",
            index: true
        },
        lastSeen: Date,

        // account control 

        isBlocked: {
            type: Boolean,
            default: false
        },
        lastActiveAt: {
            type: Date,
            default: null,
            index: true,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
            index: true,
        },

        isDeleted: {
            type: Boolean,
            default: false,
            index: true,
        },

        deletedAt: {
            type: Date,
            default: null,
        },
        createdAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;