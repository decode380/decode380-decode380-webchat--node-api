import { Router } from "express";
import { param } from "express-validator";

import { getMessagesByChatId, insertMessage } from "../controllers/messages.controller.js";
import { checkJWT } from "../middlewares/check-jwt.js";
import { checkValidations } from "../middlewares/check-validations.js";

export const router = Router();

router.get('/:id', [
    param('id', 'id of user is required on path').not().isEmpty(),
    checkValidations,
    checkJWT,
    getMessagesByChatId
]);

router.post('/', [
    checkJWT,
    insertMessage
]);