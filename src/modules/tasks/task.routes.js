import { Router } from "express";

import verifyJWT from "../../middlewares/auth.middleware.js";

import validate from "../../middlewares/validate.middleware.js";

import { createTaskValidation } from "./task.validation.js";

import {

    createTaskController,

    getTodayTasksController,

    getAllTasksController,

    getTaskByIdController,

    updateTaskController,

    completeTaskController,

    deleteTaskController

} from "./task.controller.js";

const router = Router();

router.use(verifyJWT);

router.post(

    "/",

    validate(createTaskValidation),

    createTaskController

);
router.get(
    "/",
    getAllTasksController
);

router.get(

    "/today",

    getTodayTasksController

);
router.get(
    "/:taskId",
    getTaskByIdController
);

router.patch(

    "/:taskId/complete",

    completeTaskController

);

router.delete(

    "/:taskId",

    deleteTaskController

);

export default router;