import { MutationResolvers } from '../__generated__/resolvers-types';
import { LastMessage } from '@repoRoot/types';
import { SECRET } from '@/utils/config';
import jwt from 'jsonwebtoken';
import '@/models/index';
import { User, Conversation } from '@/models/index';
import Message from '@/models/message';

// Use the generated `MutationResolvers` type to type check our mutations!
const mutations: MutationResolvers = {
  addUser: async (
    parent,
    { uid, email, firstName, lastName },
    contextValue,
    info
  ) => {
    try {
      const user = await User.create({ uid, email, firstName, lastName });

      return {
        code: '200',
        success: true,
        message: 'User created successfully!',
        user: user.toJSON(),
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
    const user = await User.findOne({ where: { email } });

    return {
      code: '200',
      success: true,
      message: 'Token generated successfully!',
      token,
      user: user?.toJSON(),
    };
  },
  sendMessage: async (parent, args, contextValue, info) => {
    const { senderId, recipientId, message: messageContent } = args;

    // Fetch existing conversation between sender and recipient
    let conversation = await Conversation.findOne({
      include: {
        model: User,
        where: { id: senderId },
        attributes: [],
        required: true,
        as: 'participants',
      },
    });

    const lastMessageData: LastMessage = {
      senderId,
      content: messageContent,
      timestamp: new Date(),
    };

    // If there is no existing Conversation
    if (!conversation) {
      // Create a Conversation row
      conversation = await Conversation.create({
        lastMessage: lastMessageData,
      });

      // If the sender sends themselves a message
      if (senderId === recipientId) {
        // Just add one instance of that User in the UserConversations
        // through/join table
        await conversation.addUser(senderId);
      }
    } else {
      conversation.lastMessage = lastMessageData;

      await conversation.save();
    }

    const message = await Message.create({
      content: messageContent,
      senderId,
      recipientId,
      conversationId: conversation.id,
    });

    return {
      code: '200',
      success: true,
      httpMessage: 'Conversation created successfully',
      message,
      conversation,
    };
  },
};

export default mutations;
