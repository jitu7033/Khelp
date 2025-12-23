const sendResponse = (
    res,
    {
        statusCode = 200,
        message = "Success",
        data = null,
        errors = null
    } = {}
) => {
    const success = statusCode >= 200 && statusCode < 300;

    return res.status(statusCode).json({
        success,
        message,
        data,
        errors
    });
};
export default sendResponse;
