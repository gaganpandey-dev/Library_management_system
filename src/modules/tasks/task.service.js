import Task from "./task.model.js";

import Student from "../student/student.model.js";

import { ApiError } from "../../utils/ApiError.js";

const createTask = async (taskData, studentId) => {

    // Check Student

    const student = await Student.findById(studentId);

    if (!student) {

        throw new ApiError(
            404,
            "Student not found."
        );

    }

    const task = await Task.create({

        ...taskData,

        createdBy: student._id

    });

    return task;

};

const getTodayTasks = async (studentId) => {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    const tasks = await Task.find({

        createdBy: studentId,

        scheduledDate: {

            $gte: today,

            $lt: tomorrow

        }

    }).sort({

        startTime: 1

    });

    return tasks;

};

const completeTask = async (taskId, studentId) => {

    const task = await Task.findOne({

        _id: taskId,

        createdBy: studentId

    });

    if (!task) {

        throw new ApiError(

            404,

            "Task not found."

        );

    }

    task.status = "COMPLETED";

    task.completedAt = new Date();

    await task.save();

    return task;

};

const deleteTask = async (taskId, studentId) => {

    const task = await Task.findOneAndDelete({

        _id: taskId,

        createdBy: studentId

    });

    if (!task) {

        throw new ApiError(

            404,

            "Task not found."

        );

    }

    return;

};
const getAllTasks = async (studentId) => {

    return await Task.find({

        createdBy: studentId

    }).sort({

        scheduledDate: 1,

        startTime: 1

    });

};
const getTaskById = async (taskId, studentId) => {

    const task = await Task.findOne({

        _id: taskId,

        createdBy: studentId

    });

    if (!task) {

        throw new ApiError(

            404,

            "Task not found."

        );

    }

    return task;

};const updateTask = async (

    taskId,

    studentId,

    updateData

) => {

    const task = await Task.findOne({

        _id: taskId,

        createdBy: studentId

    });

    if (!task) {

        throw new ApiError(

            404,

            "Task not found."

        );

    }

    Object.assign(task, updateData);

    await task.save();

    return task;

};

export {

    createTask,

    getTodayTasks,

    getAllTasks,

    getTaskById,

    updateTask,

    completeTask,

    deleteTask

};