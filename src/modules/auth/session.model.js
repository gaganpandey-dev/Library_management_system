import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        refreshToken: {
            type: String,
            required: true,
            select: false
        },

        deviceName: {
            type: String,
            default: "Unknown Device"
        },

        deviceType: {
            type: String,
            default: "Unknown"
        },

        browser: {
            type: String,
            default: "Unknown"
        },

        ipAddress: {
            type: String
        },

        isActive: {
            type: Boolean,
            default: true
        },

        lastActivity: {
            type: Date,
            default: Date.now
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;