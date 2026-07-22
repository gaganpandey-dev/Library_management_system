import RegistrationRequest from "./registrationRequest.model.js";
import { ApiError } from "../../utils/ApiError.js";

const registerStudent = async (studentData) => {

    const {
        name,
        fatherName,
        mobileNumber,
        studentClass,
        section
    } = studentData;

    // Check duplicate registration
    const existingRequest = await RegistrationRequest.findOne({
        mobileNumber
    });

    if (existingRequest) {

        throw new ApiError(
            409,
            "A registration request already exists for this mobile number."
        );

    }

    const registrationRequest = await RegistrationRequest.create({

        name,
        fatherName,
        mobileNumber,
        studentClass,
        section

    });

   return {
    registrationId: registrationRequest._id,
    status: registrationRequest.status,
    message: "Registration request created successfully."
};// we are not returnong all beacuse frontend dont need thesse so we ahve dicided to show what it needs only 


};

export {
    registerStudent
};