import jwt from "jsonwebtoken";

import User from "../modules/auth/user.model.js";

import { ApiError } from "../utils/ApiError.js";

import   { asyncHandler } from "../utils/asyncHandler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {

    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {

        throw new ApiError(
            401,
            "Access token is missing."
        );

    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(

        token,

        process.env.ACCESS_TOKEN_SECRET

    );

    const user = await User.findById(decodedToken.id)
        .select("-password -refreshToken");

    if (!user) {

        throw new ApiError(
            401,
            "Invalid access token."
        );

    }

    if (!user.isActive) {

        throw new ApiError(
            403,
            "Account has been disabled."
        );

    }

    req.user = user;

    next();

});

export default verifyJWT;