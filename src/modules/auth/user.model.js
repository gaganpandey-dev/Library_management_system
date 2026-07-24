import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
{
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },

    studentId:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        default:null,
        select:false
    },

    refreshToken:{
        type:String,
        default:null,
        select:false
    },

    role:{
        type:String,
        enum:["STUDENT","ADMIN"],
        default:"STUDENT"
    },

    isActive:{
        type:Boolean,
        default:true
    }

},
{
    timestamps:true,
    versionKey:false
}
);

/*************************************************
 * Model Methods
 *************************************************/

userSchema.methods.generateAccessToken = function () {

    return jwt.sign(
        {
            id: this._id,
            studentId: this.studentId,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );

};

userSchema.methods.generateRefreshToken = function () {

    return jwt.sign(
        {
            id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );

};

const User = mongoose.model("User",userSchema);

export default User;