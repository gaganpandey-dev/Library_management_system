import { Router } from "express";
import {
    register
} from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { registerValidation } from "./auth.validation.js";

const router = Router();

router.post(
    "/register",
    validate(registerValidation),
    register
);/*
router.post(
"/approve/:registrationId",
approveRegistrationController
);
*/
export default router;