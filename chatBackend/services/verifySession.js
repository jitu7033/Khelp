import Session from "../models/session.model.js"

export const verifySession = async (sessionId) => {
    return await Session.findOne({ sessionId });
}