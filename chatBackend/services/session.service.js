import Session from "../models/session.model.js";

export const findSessionBySessionId = async (sessionId) => {
    return Session.findOne({ sessionId });
}