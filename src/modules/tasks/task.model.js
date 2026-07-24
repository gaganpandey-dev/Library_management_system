import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(

    {

        title: {

            type: String,
            required: true,
            trim: true,
            maxlength: 150

        },

        description: {

            type: String,
            trim: true,
            default: ""

        },

        subject: {

            type: String,
            trim: true,
            default: ""

        },

        category: {

            type: String,

            enum: [

                "STUDY",
                "REVISION",
                "ASSIGNMENT",
                "PROJECT",
                "EXAM",
                "PERSONAL"

            ],

            default: "STUDY"

        },

        priority: {

            type: String,

            enum: [

                "LOW",
                "MEDIUM",
                "HIGH",
                "CRITICAL"

            ],

            default: "MEDIUM"

        },

        estimatedMinutes: {

            type: Number,
            default: 0

        },

        actualMinutes: {

            type: Number,
            default: 0

        },

        scheduledDate: {

            type: Date,
            required: true

        },

        startTime: {

            type: String,
            required: true

        },

        dueTime: {

            type: String,
            required: true

        },

        status: {

            type: String,

            enum: [

                "PENDING",
                "IN_PROGRESS",
                "COMPLETED",
                "OVERDUE",
                "SKIPPED",
                "CANCELLED"

            ],

            default: "PENDING"

        },

        repeat: {

            type: String,

            enum: [

                "NONE",
                "DAILY",
                "WEEKLY",
                "MONTHLY"

            ],

            default: "NONE"

        },

        completedAt: {

            type: Date,
            default: null

        },

        createdBy: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Student",

            required: true

        }

    },

    {

        timestamps: true

    }

);

const Task = mongoose.model("Task", taskSchema);

export default Task;