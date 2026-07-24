import { z } from "zod";

const createTaskValidation = z.object({

    title: z
        .string()
        .trim()
        .min(3, "Task title must be at least 3 characters.")
        .max(150, "Task title cannot exceed 150 characters."),

    description: z
        .string()
        .trim()
        .optional(),

    subject: z
        .string()
        .trim()
        .optional(),

    category: z.enum(
        [
            "STUDY",
            "REVISION",
            "ASSIGNMENT",
            "PROJECT",
            "EXAM",
            "PERSONAL"
        ],
        {
            errorMap: () => ({
                message: "Invalid task category."
            })
        }
    ),

    priority: z.enum(
        [
            "LOW",
            "MEDIUM",
            "HIGH",
            "CRITICAL"
        ],
        {
            errorMap: () => ({
                message: "Invalid priority."
            })
        }
    ),

    estimatedMinutes: z
        .number()
        .int()
        .min(0, "Estimated minutes cannot be negative."),

    scheduledDate: z
        .string()
        .min(1, "Scheduled date is required."),

    startTime: z
        .string()
        .regex(
            /^([01]\d|2[0-3]):([0-5]\d)$/,
            "Start time must be in HH:mm format."
        ),

    dueTime: z
        .string()
        .regex(
            /^([01]\d|2[0-3]):([0-5]\d)$/,
            "Due time must be in HH:mm format."
        ),

    repeat: z.enum(
        [
            "NONE",
            "DAILY",
            "WEEKLY",
            "MONTHLY"
        ],
        {
            errorMap: () => ({
                message: "Invalid repeat option."
            })
        }
    )

});
const updateTaskValidation = z.object({

    title: z
        .string()
        .trim()
        .min(3)
        .max(150)
        .optional(),

    description: z
        .string()
        .trim()
        .optional(),

    subject: z
        .string()
        .trim()
        .optional(),

    category: z.enum([
        "STUDY",
        "REVISION",
        "ASSIGNMENT",
        "PROJECT",
        "EXAM",
        "PERSONAL"
    ]).optional(),

    priority: z.enum([
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL"
    ]).optional(),

    estimatedMinutes: z
        .number()
        .int()
        .min(0)
        .optional(),

    scheduledDate: z
        .string()
        .optional(),

    startTime: z
        .string()
        .optional(),

    dueTime: z
        .string()
        .optional(),

    repeat: z.enum([
        "NONE",
        "DAILY",
        "WEEKLY",
        "MONTHLY"
    ]).optional()

});


export {

    createTaskValidation,

    updateTaskValidation

};