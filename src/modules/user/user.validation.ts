import { z } from "zod";

const userSchemaValidation = z.object({
  // password: z
  //   .string({ invalid_type_error: "Password must be character with number" })
  //   .max(20, { message: "Password can't be more than 20 characters" })
  //   .optional(),
  password: z.string().optional(),
});

export const UserValidation = { userSchemaValidation };
