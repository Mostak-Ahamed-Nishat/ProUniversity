import { Schema, model } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentMethods,
  TStudentModel,
  TUserName,
} from "./student.interface";

import bcrypt from "bcrypt";
import config from "../../config";

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
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<TStudent, TStudentModel, TStudentMethods>(
  {
    name: userNameSchema,
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
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

    contactNumber: {
      // Changed from contactNo to contactNumber
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//Custom instance method for checking if the user already exists
studentSchema.methods.isUserExist = async function (
  id: string
): Promise<TStudent | null> {
  return await Student.findOne({ id });
};

//Pre save middleware
studentSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.SALT_ROUNDS));
  next();
});

//Query middleware to remove password from the response
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("aggregate", function (next) {
  // Add the filter to exclude deleted documents
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

const Student = model<TStudent, TStudentModel>("Student", studentSchema);
export default Student;
