import { Router } from "express";

import verifyJWT from "../../middlewares/auth.middleware.js";

import { getDashboard } from "./student.controller.js";

const router = Router();

router.get(

    "/dashboard",

    verifyJWT,

    getDashboard

);

export default router;