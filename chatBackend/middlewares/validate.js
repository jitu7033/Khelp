import { ApiError } from "../utils/apiError.js";

export const validate = (schema, property = "body") => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            throw new ApiError(
                400,
                "validation Error",
                error
            );
        }
        req[property] = value;
        next();
    }
}