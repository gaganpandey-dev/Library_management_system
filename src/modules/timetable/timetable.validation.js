import { z } from "zod";

const DAYS = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY"
];

const TYPES = [
    "CLASS",
    "SELF_STUDY",
    "REVISION",
    "LAB",
    "EXAM"
];

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const createTimetableValidation = z.object({

    subject: z
        .string()
        .trim()
        .min(2, "Subject must be at least 2 characters.")
        .max(100, "Subject cannot exceed 100 characters."),

    day: z.enum(DAYS),

    startTime: z
        .string()
        .regex(
            timeRegex,
            "Start time must be in HH:mm format."
        ),

    endTime: z
        .string()
        .regex(
            timeRegex,
            "End time must be in HH:mm format."
        ),

    type: z
        .enum(TYPES)
        .default("CLASS"),

    location: z
        .string()
        .trim()
        .max(100)
        .optional(),

    isActive: z
        .boolean()
        .optional()

});

const updateTimetableValidation = createTimetableValidation.partial();

export {

    createTimetableValidation,

    updateTimetableValidation

};