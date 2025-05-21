import { Schema, model } from "mongoose";
import {
  GuardianInterface,
  LocalGuardianInterface,
  StudentInterface,
  UserNameInterface,
} from "./student.interface";

export const userNameSchema = new Schema<UserNameInterface>({
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

export const guardianSchema = new Schema<GuardianInterface>({
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

export const localGuardianSchema = new Schema<LocalGuardianInterface>({
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

const studentSchema = new Schema<StudentInterface>(
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
      validate: {
        validator: (value: Date) => value instanceof Date && value < new Date(),
        message: "Date of birth must be in the past",
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email format",
      },
    },

    contactNo: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => {
          return /^\+?\d{10,15}$/.test(value);
        },
        message: "Invalid contact number",
      },
    },

    emergencyContactNo: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => {
          return /^\+?\d{10,15}$/.test(value);
        },
        message: "Invalid emergency contact number",
      },
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
      validate: {
        validator: (value: string) => {
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(value);
        },
        message: "Invalid image URL format",
      },
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

const Student = model<StudentInterface>("Student", studentSchema);
export default Student;
