import { z } from 'zod';

const authFormSchema = z.object({
  // Regex to allow only alphabets and spaces
  firstName: z
    .string()
    .regex(/^[A-Za-z\s]+$/, {
      message: 'First name must contain only alphabets',
    })
    .optional(),
  lastName: z
    .string()
    .regex(/^[A-Za-z\s]+$/, {
      message: 'Last name must contain only alphabets',
    })
    .optional(),
  email: z.string().email('Must be a valid email address'),
  password: z.string().min(8, {
    message:
      'Password must be at least 8 characters long including special characters, numbers, lowercase and uppercase letters',
  }),
});

export { authFormSchema };
