import {
    createTask,
    getTodayTasks,
    completeTask,
    deleteTask,
    getAllTasks,
getTaskById,
updateTask
} from "./task.service.js";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const createTaskController = asyncHandler(async (req, res) => {

    const task = await createTask(
        req.body,
        req.user.student
    );

    return res.status(201).json(

        new ApiResponse(
            201,
            task,
            "Task created successfully."
        )

    );

});

const getTodayTasksController = asyncHandler(async (req, res) => {

    const tasks = await getTodayTasks(
        req.user.student
    );

    return res.status(200).json(

        new ApiResponse(
            200,
            tasks,
            "Today's tasks fetched successfully."
        )

    );

});

const completeTaskController = asyncHandler(async (req, res) => {

    const task = await completeTask(

        req.params.taskId,

        req.user.student

    );

    return res.status(200).json(

        new ApiResponse(

            200,

            task,

            "Task completed successfully."

        )

    );

});

const deleteTaskController = asyncHandler(async (req, res) => {

    await deleteTask(

        req.params.taskId,

        req.user.student

    );

    return res.status(200).json(

        new ApiResponse(

            200,

            {},

            "Task deleted successfully."

        )

    );

});
const getAllTasksController = asyncHandler(async (req, res) => {

    const tasks = await getAllTasks(

        req.user.student

    );

    return res.status(200).json(

        new ApiResponse(

            200,

            tasks,

            "Tasks fetched successfully."

        )

    );

});
const getTaskByIdController = asyncHandler(async (req, res) => {

    const task = await getTaskById(

        req.params.taskId,

        req.user.student

    );

    return res.status(200).json(

        new ApiResponse(

            200,

            task,

            "Task fetched successfully."

        )

    );

});
const updateTaskController = asyncHandler(async (req, res) => {

    const task = await updateTask(

        req.params.taskId,

        req.user.student,

        req.body

    );

    return res.status(200).json(

        new ApiResponse(

            200,

            task,

            "Task updated successfully."

        )

    );

});
export {

    createTaskController,

    getTodayTasksController,

    getAllTasksController,

    getTaskByIdController,

    updateTaskController,

    completeTaskController,

    deleteTaskController

};