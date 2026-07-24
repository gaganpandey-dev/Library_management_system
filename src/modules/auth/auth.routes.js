import { Router } from "express";
import {
    register,
    createPasswordController,
    login
} from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { registerValidation ,
    createPasswordValidation,
    loginValidation
} from "./auth.validation.js";

import verifyJWT from "../../middlewares/auth.middleware.js";
const router = Router();

router.post(
    "/register",
    validate(registerValidation),
    register
);
router.post(
    "/create-password",
    validate(createPasswordValidation),
    createPasswordController
);
router.post(

    "/login",

    validate(loginValidation),

    login

);










/*
router.post(
"/approve/:registrationId",
approveRegistrationController
);
*/
export default router;