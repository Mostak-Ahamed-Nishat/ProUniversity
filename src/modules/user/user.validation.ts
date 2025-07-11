import { z } from "zod";

const userSchemaValidation = z.object({
  id: z.string(),
  password: z
    .string()
    .max(20, { message: "Password can't be more than 20 characters" }),
  role: z.enum(["admin", "faculty", "student"]),
  needPasswordChange: z.boolean().optional(),
  status: z.enum(["in-progress", "blocked"]).default("in-progress"),
  isDeleted: z.boolean().default(false).optional(),
});

export const UserValidation = { userSchemaValidation };
