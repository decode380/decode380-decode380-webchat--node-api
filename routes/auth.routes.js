import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { checkValidations } from "../middlewares/check-validations.js";
import { checkJWT } from "../middlewares/check-jwt.js";

export const router = Router();

router.post('/login', [
    body('username', 'username is required').not().isEmpty(),
    body('password', 'password is required').not().isEmpty(),
    checkValidations,
    login
]);