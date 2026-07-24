import RegistrationRequest from "./registrationRequest.model.js";
import Student from "../student/student.model.js";
import User from "./user.model.js";
import delay from "../../utils/delay.js";
import { ApiError } from "../../utils/ApiError.js";
import generateStudentId from "../../utils/studentIdGenerator.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

// this function is use to created password by user to stode in the hashing form 
const createPassword = async ({ studentId , password }) => {

    // find user 
    const user  = await User.findOne({ studentId}).select("+password");
    if (!user){
        throw new ApiError(
            404,
            "student not found"
        );
    }

    // Password already created
    if (user.password){
        throw new ApiError(
            409,
            "Password has already beeen created ."
        );
    }

    // Hash password
     /* Hash the password before storing it.
 * Never save plain text passwords.*/
   const SALT_ROUNDS = 10;

const hashedPassword = await bcrypt.hash(
    password,
    SALT_ROUNDS
);
    user.password = hashedPassword;
    await user.save({
        validateBeforeSave:false
    });


    return {
        studentId: user.studentId,
        passwordCreated: true ,
        nextStep: "Login using student ID and password"
    };
}




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
const loginStudent = async ({ studentId, password }) => {

    const user = await User.findOne({

        studentId

    }).select("+password");

    if (!user) {

        throw new ApiError(

            404,

            "Student not found."

        );

    }

    if (!user.password) {

        throw new ApiError(

            400,

            "Please create your password first."

        );

    }

    const isPasswordCorrect = await bcrypt.compare(

        password,

        user.password

    );

    if (!isPasswordCorrect) {

        throw new ApiError(

            401,

            "Invalid Student ID or Password."

        );

    }

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    return {

        accessToken,

        refreshToken,

        studentId: user.studentId,

        role: user.role

    };

};

export {
    registerStudent, 
    createPassword,
    loginStudent
};