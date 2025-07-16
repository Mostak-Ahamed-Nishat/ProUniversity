import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import {
  AcademicCode,
  AcademicName,
  Months,
} from "./academicSemester.constant";

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicName,
    },
    code: {
      type: String,
      enum: AcademicCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
      enum: Months,
    },
    endDate: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//Same semester can't be duplicate with that year !!
academicSemesterSchema.pre("save", async function (next) {
  const isSemesterExist = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExist) {
    throw Error("Semester Already Exist!!");
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
