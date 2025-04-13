import { z } from 'zod';
import { authFormSchema } from './utils/schema';

export type AuthFormInput = z.infer<typeof authFormSchema>;

export interface UserDB {
  __typename?: 'User';
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
}
