import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { registerStudent } from "./auth.service.js";

const register = asyncHandler(async (req, res) => {
    const studentData = req.body;

    const result =await registerStudent(studentData);

    return res.status(201).json(
        new ApiResponse(
            201,
            result ,
            "Registration request submitted successfully "
        )
    );
});
export { register };