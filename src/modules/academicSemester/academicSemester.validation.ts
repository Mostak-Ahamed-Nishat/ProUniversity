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

export const AcademicSemesterValidationSchema = {
  CreateSemester,
};
