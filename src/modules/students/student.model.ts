import { Schema, model } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";

export const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

export const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    required: true,
    type: String,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

export const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    required: true,
    type: String,
  },
  occupation: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<TStudent>(
  {
    name: userNameSchema,

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    dateOfBirth: {
      type: Schema.Types.Date,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    contactNo: {
      type: String,
      required: true,
    },

    emergencyContactNo: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },

    presentAddress: {
      type: String,
      required: true,
      trim: true,
    },

    permanentAddress: {
      type: String,
      required: true,
      trim: true,
    },

    guardian: guardianSchema,

    localGuardian: localGuardianSchema,
    profileImg: {
      type: String,
    },

    isActive: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Create indexes for frequently queried fields
studentSchema.index({ email: 1 }, { unique: true });
studentSchema.index({ "name.firstName": 1, "name.lastName": 1 });

const Student = model<TStudent>("Student", studentSchema);
export default Student;
