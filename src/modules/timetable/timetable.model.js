import mongoose, { trusted } from "mongoose";

const timetableSchema = new mongoose.Schema(

    {

        student: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Student",

            required: true

        },

        subject: {

            type: String,

            required: true,

            trim: true,

            maxlength: 100

        },

        day: {

            type: String,

            enum: [

                "MONDAY",

                "TUESDAY",

                "WEDNESDAY",

                "THURSDAY",

                "FRIDAY",

                "SATURDAY",

                "SUNDAY"

            ],

            required: true

        },

        startTime: {

            type: String,

            required: true

        },

        endTime: {

            type: String,

            required: true

        },

        type: {

            type: String,

            enum: [

                "CLASS",

                "SELF_STUDY",

                "REVISION",

                "LAB",

                "EXAM"

            ],

            default: "CLASS"

        },

        location: {

            type: String,

            trim: true,

            default: ""

        },

        isActive: {

            type: Boolean,

            default: true

        }

    },

    {

        timestamps: true,

        versionKey: false

    }

);
timetableSchema.index({

    student: 1,

    day: 1,

    startTime: 1

},
{
    unique: true
}
);
const Timetable = mongoose.model(

    "Timetable",

    timetableSchema

);

export default Timetable;