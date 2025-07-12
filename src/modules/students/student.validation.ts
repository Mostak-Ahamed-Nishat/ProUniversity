import { z } from "zod";

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required." })
    .max(20, { message: "First name can't be more than 20 characters." }),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .trim()
    .min(1, { message: "Father's name is required." }),
  fatherOccupation: z
    .string()
    .trim()
    .min(1, { message: "Father's occupation is required." }),
  fatherContactNo: z
    .string()
    .trim()
    .regex(/^\d{10}$/, {
      message: "Father's contact number must be a valid 10-digit number.",
    }),
  motherName: z
    .string()
    .trim()
    .min(1, { message: "Mother's name is required." }),
  motherOccupation: z
    .string()
    .trim()
    .min(1, { message: "Mother's occupation is required." }),
  motherContactNo: z
    .string()
    .trim()
    .regex(/^\d{10}$/, {
      message: "Mother's contact number must be a valid 10-digit number.",
    }),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Local guardian's name is required." }),
  occupation: z
    .string()
    .trim()
    .min(1, { message: "Local guardian's occupation is required." }),
  contactNo: z
    .string()
    .trim()
    .regex(/^\d{10}$/, {
      message:
        "Local guardian's contact number must be a valid 10-digit number.",
    }),
  address: z
    .string()
    .trim()
    .min(1, { message: "Local guardian's address is required." }),
});

// Student Schema
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, { message: "Password should be at least 6 character" }),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(["female", "male"], {
        errorMap: () => ({ message: "Gender must be 'male' or 'female'." }),
      }),
      isDeleted: z.boolean(),
      email: z.string().trim().email({ message: "Invalid email address." }),
      dateOfBirth: z.date().optional(),
      contactNo: z // Changed from contactNumber to contactNo
        .string()
        .trim()
        .regex(/^\d{10}$/, {
          message: "Contact number must be a valid 10-digit number.",
        }),
      emergencyContactNo: z
        .string()
        .trim()
        .regex(/^\d{10}$/, {
          message: "Emergency contact number must be a valid 10-digit number.",
        }),
      bloodGroup: z.enum(["A+", "A", "B+", "B", "O+", "O", "AB+", "AB"], {
        errorMap: (value) => ({
          message: `${value} is not a valid blood group.`,
        }),
      }),
      avatar: z.string().url().optional(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      permanentAddress: z
        .string()
        .trim()
        .min(1, { message: "Permanent address is required." }),
      presentAddress: z
        .string()
        .trim()
        .min(1, { message: "Present address is required." }),
      profileImage: z.string().url().optional(),
    }),
  }),
});
