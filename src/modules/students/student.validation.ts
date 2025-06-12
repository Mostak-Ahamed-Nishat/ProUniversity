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
const createStudentValidationSchema = z.object({
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
      contactNumber: z
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
      // isActive: z.enum(["active", "inactive"], {
      //   errorMap: () => ({ message: "Status must be 'active' or 'inactive'." }),
      // }),
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

// Export the schema for validation
export const studentValidations = {
  studentValidationSchema: createStudentValidationSchema,
};

// !~=========================>

// import { z } from "zod";

// // Username validation schema
// const userNameValidationSchema = z.object({
//   firstName: z.string({
//     required_error: "First name is required",
//   }),
//   middleName: z.string().optional(),
//   lastName: z.string().optional(),
// });

// // Guardian validation schema
// const guardianValidationSchema = z.object({
//   fatherName: z.string({
//     required_error: "Father name is required",
//   }),
//   fatherOccupation: z.string({
//     required_error: "Father occupation is required",
//   }),
//   fatherContactNo: z.string({
//     required_error: "Father contact number is required",
//   }),
//   motherName: z.string({
//     required_error: "Mother name is required",
//   }),
//   motherOccupation: z.string({
//     required_error: "Mother occupation is required",
//   }),
//   motherContactNo: z.string({
//     required_error: "Mother contact number is required",
//   }),
// });

// // Local guardian validation schema
// const localGuardianValidationSchema = z.object({
//   name: z.string({
//     required_error: "Local guardian name is required",
//   }),
//   occupation: z.string({
//     required_error: "Local guardian occupation is required",
//   }),
//   contact: z.string({
//     required_error: "Local guardian contact is required",
//   }),
//   address: z.string({
//     required_error: "Local guardian address is required",
//   }),
// });

// // Student validation schema
// export const createStudentValidationSchema = z.object({
//   body: z.object({
//     name: userNameValidationSchema,
//     gender: z.enum(["male", "female", "other"], {
//       required_error: "Gender is required",
//     }),
//     dateOfBirth: z
//       .string({
//         required_error: "Date of birth is required",
//       })
//       .refine(
//         (date) => {
//           const dob = new Date(date);
//           const now = new Date();
//           return dob < now;
//         },
//         {
//           message: "Date of birth must be in the past",
//         }
//       ),
//     email: z
//       .string({
//         required_error: "Email is required",
//       })
//       .email("Invalid email format"),
//     contactNo: z
//       .string({
//         required_error: "Contact number is required",
//       })
//       .regex(/^\+?\d{10,15}$/, "Invalid contact number format"),
//     emergencyContactNo: z
//       .string({
//         required_error: "Emergency contact number is required",
//       })
//       .regex(/^\+?\d{10,15}$/, "Invalid emergency contact number format"),
//     bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
//       required_error: "Blood group is required",
//     }),
//     presentAddress: z.string({
//       required_error: "Present address is required",
//     }),
//     permanentAddress: z.string({
//       required_error: "Permanent address is required",
//     }),
//     guardian: guardianValidationSchema,
//     localGuardian: localGuardianValidationSchema,
//     profileImg: z
//       .string()
//       .url("Invalid URL")
//       .regex(/\.(jpg|jpeg|png|gif)$/i, "Invalid image format")
//       .optional(),
//     isActive: z.enum(["active", "blocked"]).default("active"),
//   }),
// });

// // Update validation schema (making all fields optional)
// export const updateStudentValidationSchema = z.object({
//   body: z.object({
//     name: userNameValidationSchema.partial().optional(),
//     gender: z.enum(["male", "female", "other"]).optional(),
//     dateOfBirth: z
//       .string()
//       .refine(
//         (date) => {
//           const dob = new Date(date);
//           const now = new Date();
//           return dob < now;
//         },
//         {
//           message: "Date of birth must be in the past",
//         }
//       )
//       .optional(),
//     email: z.string().email("Invalid email format").optional(),
//     contactNo: z
//       .string()
//       .regex(/^\+?\d{10,15}$/, "Invalid contact number format")
//       .optional(),
//     emergencyContactNo: z
//       .string()
//       .regex(/^\+?\d{10,15}$/, "Invalid emergency contact number format")
//       .optional(),
//     bloodGroup: z
//       .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
//       .optional(),
//     presentAddress: z.string().optional(),
//     permanentAddress: z.string().optional(),
//     guardian: guardianValidationSchema.partial().optional(),
//     localGuardian: localGuardianValidationSchema.partial().optional(),
//     profileImg: z
//       .string()
//       .url("Invalid URL")
//       .regex(/\.(jpg|jpeg|png|gif)$/i, "Invalid image format")
//       .optional(),
//     isActive: z.enum(["active", "blocked"]).optional(),
//   }),
// });
