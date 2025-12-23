import sendResponse from "../utils/sendResponse.js";

const errorHandler = (err, req, res, next) => {
    sendResponse(res, {
        statusCode: err.statusCode || 500,
        message: err.message || "Internal Server Error",
        errors: err.errors || null
    });
};

export default errorHandler;
