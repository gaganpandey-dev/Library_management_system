import RegistrationRequest from "./registrationRequest.model.js";
import Student from "../student/student.model.js";
import User from "./user.model.js";
import delay from "../../utils/delay.js";
import { ApiError } from "../../utils/ApiError.js";
import generateStudentId from "../../utils/studentIdGenerator.js";

const registerStudent = async (studentData) => {

    const {
        name,
        fatherName,
        mobileNumber,
        studentClass,
        section
    } = studentData;

    // Check duplicate registration
   // Check if student already exists
const existingStudent = await Student.findOne({
    mobileNumber
});

if (existingStudent) {

    throw new ApiError(
        409,
        "Student already exists."
    );

}

// Check pending registration request
const existingRequest = await RegistrationRequest.findOne({
    mobileNumber,
    status: "PENDING"
});

if (existingRequest) {

    throw new ApiError(
        409,
        "Registration request is already pending approval."
    );

}

    // Create Registration Request
    const registrationRequest = await RegistrationRequest.create({

        name,
        fatherName,
        mobileNumber,
        studentClass,
        section

    });

    // Simulate Admin Approval
  

await delay(5000);
    // Approve Request
    registrationRequest.status = "APPROVED";
    registrationRequest.approvedAt = new Date();

    await registrationRequest.save();

    // Generate Student ID
    const studentId = generateStudentId();

    // Create Student
    const student = await Student.create({

        studentId,
        name,
        fatherName,
        mobileNumber,
        studentClass,
        section,
        registrationRequest: registrationRequest._id

    });

    // Create User
    await User.create({

        student: student._id,
        studentId

    });
return {

    studentId,

    studentName: student.name,

    registrationStatus: registrationRequest.status,

   

    nextStep: "Create your password to continue."

};
   

};

export {
    registerStudent
};