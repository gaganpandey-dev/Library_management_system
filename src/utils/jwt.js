import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {

    return jwt.sign(

        {

            id: user._id,

            studentId: user.studentId,

            role: user.role

        },

        process.env.ACCESS_TOKEN_SECRET,

        {

            expiresIn: process.env.ACCESS_TOKEN_EXPIRY

        }

    );

};

const generateRefreshToken = (user) => {

    return jwt.sign(

        {

            id: user._id

        },

        process.env.REFRESH_TOKEN_SECRET,

        {

            expiresIn: process.env.REFRESH_TOKEN_EXPIRY

        }

    );

};

export {

    generateAccessToken,

    generateRefreshToken

};