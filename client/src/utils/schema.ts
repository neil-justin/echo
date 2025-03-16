import { z } from "zod";

const authFormSchema = z
  .object({
    email: z.string().email('Must be a valid email address'),
    password: z.string().min(8, {
      message:
        'Password must be at least 8 characters long including special characters, numbers, lowercase and uppercase letters',
    }),
  })
  .required();

export { authFormSchema };
