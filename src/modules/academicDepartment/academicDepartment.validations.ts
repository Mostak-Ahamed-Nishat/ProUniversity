import { z } from "zod";

const createAcademicDepartmentSchema = z.object({
  name: z.string({
    invalid_type_error: "Academic Department must be string",
    required_error: "Department Name is required!",
  }),
  academicFaculty: z.string({
    invalid_type_error: "Academic faculty id must be string",
    required_error: "Academic faculty id is required!",
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Academic Department must be string",
      required_error: "Department Name is required!",
    })
    .optional(),
  academicFaculty: z
    .string({
      invalid_type_error: "Academic faculty id must be string",
      required_error: "Academic faculty id is required!",
    })
    .optional(),
});

export const AcademicDepartmentValidation = {
  create: createAcademicDepartmentSchema,
  update: updateAcademicDepartmentValidationSchema,
};
