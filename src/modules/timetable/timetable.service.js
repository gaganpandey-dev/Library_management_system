import Timetable from "./timetable.model.js";
import Student from "../student/student.model.js";

import ApiError from "../../utils/ApiError.js";
import { isTimeOverlap, isValidTimeRange } from "../../helpers/time.helper.js";
const createTimetable = async (studentId, timetableData) => {

    const {

        subject,

        day,

        startTime,

        endTime,

        type,

        location

    } = timetableData;

    if (!isValidTimeRange(startTime, endTime)) {

        throw new ApiError(
            400,
            "End time must be greater than start time."
        );

    }

    const student = await Student.findById(studentId).lean();

    if (!student) {

        throw new ApiError(
            404,
            "Student not found."
        );

    }

    const existingTimetables = await Timetable.find({

        student: studentId,

        day,

        isActive: true

    }).lean();

    for (const timetable of existingTimetables) {

        if (

            isTimeOverlap(

                timetable.startTime,

                timetable.endTime,

                startTime,

                endTime

            )

        ) {

            throw new ApiError(

                409,

                "Timetable overlaps with another class."

            );

        }

    }

    const newTimetable = await Timetable.create({

        student: studentId,

        subject,

        day,

        startTime,

        endTime,

        type,

        location

    });

    return newTimetable;

};
const getAllTimetables = async (studentId) => {

    return await Timetable.find({

        student: studentId,

        isActive: true

    })

    .sort({

        day:1,

        startTime:1

    });

};
const getTimetableById = async (studentId, timetableId) => {

    const timetable = await Timetable.findOne({

        _id: timetableId,

        student: studentId,

        isActive:true

    });

    if(!timetable){

        throw new ApiError(

            404,

            "Timetable not found."

        );

    }

    return timetable;

};
const deleteTimetable = async(studentId,timetableId)=>{

    const timetable = await Timetable.findOne({

        _id:timetableId,

        student:studentId

    });

    if(!timetable){

        throw new ApiError(

            404,

            "Timetable not found."

        );

    }

    timetable.isActive=false;

    await timetable.save();

    return timetable;

}
export {

    createTimetable,

    getAllTimetables,

    getTimetableById,

    deleteTimetable

};