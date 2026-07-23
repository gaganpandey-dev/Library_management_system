import mongoose from "mongoose";

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

const User = mongoose.model("User",userSchema);

export default User;