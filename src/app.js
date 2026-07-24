
import express from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.routes.js";
import studentRouter from "./modules/student/student.routes.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import taskRoutes from "./modules/tasks/task.routes.js";


const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

// Parse JSON FIRST
app.use(express.json({ limit: "16kb" }));

app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    })
);


// THEN routes
app.use("/api/v1/auth", authRouter);
app.use(

    "/api/v1/student",

    studentRouter
);
app.use("/api/v1/tasks", taskRoutes);

export default app;