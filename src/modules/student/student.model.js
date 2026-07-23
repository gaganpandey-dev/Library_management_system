import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
{
    studentId:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    profileCompleted:{
    type:Boolean,
    default:false
},

    name:{
        type:String,
        required:true,
        trim:true
    },

    fatherName:{
        type:String,
        required:true,
        trim:true
    },

    mobileNumber:{
        type:String,
        required:true,
        unique:true
    },

    studentClass:{
        type:String,
        required:true
    },

    section:{
        type:String,
        required:true
    },

    registrationRequest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RegistrationRequest"
    },

    joinedAt:{
        type:Date,
        default:Date.now
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

const Student = mongoose.model("Student",studentSchema);

export default Student;