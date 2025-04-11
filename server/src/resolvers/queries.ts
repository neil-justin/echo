import User from '@/models/user';
import { QueryResolvers } from '../__generated__/resolvers-types';
import { Op } from 'sequelize';
import Conversation from '@/models/conversation';

// Use the generated `QueryResolvers` type to type check our queries!
const queries: QueryResolvers = {
  searchedUsers: async (parent, args, contextValue, info) => {
    const { searchTerm } = args;

    let users: User[] = [];

    if (searchTerm.trim().length > 0) {
      users = await User.findAll({
        where: {
          [Op.or]: [
            // With wildcard "%", case-insensitive search
            { firstName: { [Op.iLike]: `%${searchTerm}%` } },
            { lastName: { [Op.iLike]: `%${searchTerm}%` } },
          ],
        },
      });
    }

    return {
      code: '200',
      success: true,
      message: 'Queried users using search term',
      users,
    };
  },
  userConversations: async (parent, args, contextValue, info) => {
    const { userId } = args;

    const conversations = await Conversation.findAll({
      include: [
        {
          model: User,
          as: 'participants',
          where: { id: userId },
        },
      ],
    });

    return {
      code: '200',
      success: true,
      message: "Query User's conversations succssfully",
      conversations,
    };
  },
};

export default queries;
