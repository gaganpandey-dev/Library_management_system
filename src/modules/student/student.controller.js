import   { asyncHandler }  from "../../utils/asyncHandler.js";

import { ApiResponse} from "../../utils/ApiResponse.js";

const getDashboard = asyncHandler(async (req, res) => {

    return res.status(200).json(

        new ApiResponse(

            200,

            {

                student: req.user

            },

            "Dashboard loaded successfully."

        )

    );

});

export {

    getDashboard

};