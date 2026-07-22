import { z } from "zod";

export const registerValidation = z.object({

    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(50),

    fatherName: z
        .string()
        .trim()
        .min(3)
        .max(50),

    mobileNumber: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Invalid mobile number"),

    studentClass: z
        .string()
        .trim(),

    section: z
        .string()
        .trim()

});