import { request, response } from "express";
import jwt from "jsonwebtoken";
import { decodeToken } from "../helpers/jwt.helper.js";

export const checkJWT = (req = request, res = response, next) => {
    const token = req.headers['authorization'];
    decodeToken(token)
    .then(() => next())
    .catch((error) => res.status(401).json({ error }));
};