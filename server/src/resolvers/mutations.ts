import { MutationResolvers } from '../__generated__/resolvers-types';
import User from '@/models/user';

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
};

export default mutations;
