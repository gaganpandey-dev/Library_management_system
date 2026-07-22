import mongoose from 'mongoose';

const registrationRequestSchema = new mongoose.Schema(
    {
name: {
    type: String,
    required: [true,"Name is required"],
    trim: true,
    minlength: 3,
    maxlength: 50
},
   fatherName: {
      type: String,
      required: [true, "Father's name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },


    mobileNumber: {
        type:String,
        required:[true ,"Mobile number is required"],
        trim : true ,
        unique: true,
        index : true ,
        match:[/^[6-9]\d{9}$/,"Please  enter a valid mobile number "],

},   section: {
      type: String,
      required: [true, "Section is required"],
      trim: true,
    },
       studentClass: {
      type: String,
      required: [true, "Class is required"],
      trim: true,
    },
  otp: {
      type: String,
      select: false,
    },

    otpExpiresAt: {
      type: Date,
    },
     otpVerified: {
      type: Boolean,
      default: false,
    },
    approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},
  status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
      index: true,
    },
    approvedAt: {
    type: Date
},
rejectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},
rejectedAt: {
    type: Date
},
rejectionReason: {
    type: String,
    trim: true
},
},
  {
    timestamps: true,
    versionKey: false,
  

    });

    // above we have created schema and we have created model now 
    const RegistrationRequest = mongoose.model(
  "RegistrationRequest",
  registrationRequestSchema
  // this is model 
);

export default RegistrationRequest;// herewe are exporting model 
