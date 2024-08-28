import { request } from "express";
import { validationResult } from "express-validator";

export const checkValidations = (req = request, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const result = errors.array().map(err => err.msg);
        return res.status(400).json({ errors: result });
    };

    next();
}