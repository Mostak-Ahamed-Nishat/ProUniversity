import { Schema, model } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentMethods,
  TStudentModel,
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
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
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
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

//Mongoose virtual
studentSchema.virtual("fullName").get(function (this: TStudent) {
  return `${
    this.name.firstName
  } ${this.name.middleName || ""} ${this.name.lastName}`;
});

//Custom instance method for checking if the user already exists
studentSchema.methods.isUserExist = async function (
  id: string
): Promise<TStudent | null> {
  return await Student.findOne({ id });
};

//Query middleware to remove password from the response
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOneAndUpdate", function (next) {
  this.setQuery({ ...this.getQuery(), isDeleted: { $ne: true } });
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
