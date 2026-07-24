import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { registerStudent, createPassword } from "./auth.service.js";

const register = asyncHandler(async (req, res) => {

    const result = await registerStudent(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            result,
            "Congratulations! Your registration has been approved."
        )
    );

});
const createPasswordController = asyncHandler(async (req, res) => {

    const result = await createPassword(req.body);

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Password created successfully."
        )
    );
});

export {
    register,
    createPasswordController
};