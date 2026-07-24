import { Router } from "express";
import {
    register,
    createPasswordController
} from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { registerValidation ,
    createPasswordValidation
} from "./auth.validation.js";

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










/*
router.post(
"/approve/:registrationId",
approveRegistrationController
);
*/
export default router;