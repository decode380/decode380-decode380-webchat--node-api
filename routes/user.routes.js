import { Router } from 'express';
import { body, header } from "express-validator";

import { createUser } from '../controllers/user.controller.js';
import { checkJWT } from '../middlewares/check-jwt.js';
import { checkValidations } from '../middlewares/check-validations.js';

export const router = Router();

router.post('/create', [
    body('password', 'password is required').not().isEmpty(),
    body('password', 'password must be between 4 and 18 characters').isLength({ min: 4, max: 18 }),
    body('username', 'username is required').not().isEmpty(),
    body('username', 'username must be between 4 and 18 characters').isLength({ min: 4, max: 18 }),
    header('Authorization', 'Authorization header ir required').not().isEmpty(),
    checkValidations,
    checkJWT,
    createUser
]);