import { MutationResolvers } from '../__generated__/resolvers-types';
import User from '@/models/user';
import { SECRET } from '@/utils/config';
import jwt from 'jsonwebtoken';

// Use the generated `MutationResolvers` type to type check our mutations!
const mutations: MutationResolvers = {
  addUser: async (parent, { uid, email }, contextValue, info) => {
    try {
      const user = await User.create({ uid, email });
      return {
        code: '200',
        success: true,
        message: 'User created successfully!',
        user,
      };
    } catch (error) {
      console.error(error);
      return {
        code: '400',
        success: false,
        message: 'Something went wrong...',
        user: null,
      };
    }
  },
  generateToken: async (parent, { email }, contextValue, info) => {
    // Expires in 15 minutes
    const token = jwt.sign({ email }, SECRET, { expiresIn: 60 * 15 });
    return {
      code: '200',
      success: true,
      message: 'Token generated successfully!',
      token,
    };
  },
};

export default mutations;
