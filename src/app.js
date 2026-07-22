
import express from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.routes.js";

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

export default app;