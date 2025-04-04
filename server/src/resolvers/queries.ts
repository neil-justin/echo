import User from '@/models/user';
import { QueryResolvers } from '../__generated__/resolvers-types';
import { Op } from 'sequelize';

// Use the generated `QueryResolvers` type to type check our queries!
const queries: QueryResolvers = {
  searchedUsers: async (parent, args, contextValue, info) => {
    const { searchTerm } = args;

    const users = await User.findAll({
      where: {
        [Op.or]: [
          // With wildcard "%", case-insensitive search
          { firstName: { [Op.iLike]: `%${searchTerm}%` } },
          { lastName: { [Op.iLike]: `%${searchTerm}%` } },
        ],
      },
    });

    return {
      code: '200',
      success: true,
      message: 'Queried users using search term',
      users,
    };
  },
};

export default queries;
