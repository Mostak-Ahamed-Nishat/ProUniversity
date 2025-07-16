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
      type: Date,
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

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
