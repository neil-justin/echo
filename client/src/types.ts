import { z } from 'zod';
import { authFormSchema } from './utils/schema';

export type AuthFormInput = z.infer<typeof authFormSchema>;

export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface UserDB {
  __typename?: 'User';
  id: string;
  uid?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
  updatedAt?: string;
}
