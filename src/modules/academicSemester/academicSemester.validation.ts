import { z } from "zod";

import {
  AcademicCode,
  AcademicName,
  Months,
} from "./academicSemester.constant";

export const CreateSemester = z.object({
  name: z.enum([...AcademicName] as [string, ...string[]]),
  year: z.string(),
  code: z.enum([...AcademicCode] as [string, ...string[]]),
  startDate: z.enum([...Months] as [string, ...string[]]),
  endDate: z.enum([...Months] as [string, ...string[]]),
});

export const UpdateSemester = z.object({
  name: z.enum([...AcademicName] as [string, ...string[]]).optional(),
  year: z.string().optional(),
  code: z.enum([...AcademicCode] as [string, ...string[]]).optional(),
  startDate: z.enum([...Months] as [string, ...string[]]).optional(),
  endDate: z.enum([...Months] as [string, ...string[]]).optional(),
});

export const AcademicSemesterValidationSchema = {
  CreateSemester,
  UpdateSemester,
};
