import mongoose, { mongo } from "mongoose"

const sessionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true
    },
    sessionId: {
        type: String,
        unique: true,
        index: true
    },
    userAgent: String,
    ip: String,

    isValid: {
        type: Boolean,
        default: true
    }
    ,
    expiresAt: Date
},
    { timestamps: true })

const Session = mongoose.model("Session", sessionSchema);
export default Session;