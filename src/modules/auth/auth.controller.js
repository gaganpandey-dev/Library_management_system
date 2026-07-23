import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { registerStudent } from "./auth.service.js";

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

export {
    register
};