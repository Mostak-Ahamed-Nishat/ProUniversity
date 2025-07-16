import { z } from "zod";
import {
  TAcademicSemesterName,
  TAcademicSemesterCode,
  TMonths,
} from "./academicSemester.interface";
import {
  AcademicCode,
  AcademicName,
  Months,
} from "./academicSemester.constant";

const semesterNames = ["Autumn", "Summer", "Fall"] as const;
const semesterCodes = ["01", "02", "03"] as const;

export const CreateSemester = z.object({
  name: z.enum([...AcademicName] as [string, ...string[]]),
  year: z.date(),
  code: z.enum([...AcademicCode] as [string, ...string[]]),
  startDate: z.enum([...Months] as [string, ...string[]]),
  endDate: z.enum([...Months] as [string, ...string[]]),
});

export const AcademicSemesterValidationSchema = {
  CreateSemester,
};
