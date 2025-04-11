import Conversation from '@/models/conversation';
import Message from '@/models/message';
import User from '@/models/user';
import UserConversations from '@/models/userConversations';
import { sequelize } from '@/utils/db';

User.belongsToMany(Conversation, {
  through: UserConversations,
});

Conversation.belongsToMany(User, {
  through: UserConversations,
});

User.hasMany(Message, {
  foreignKey: 'senderId',
  as: 'sentMessages',
});
Message.belongsTo(User, {
  foreignKey: 'senderId',
  as: 'sender',
});

User.hasMany(Message, {
  foreignKey: 'recipientId',
  as: 'receivedMessages',
});
Message.belongsTo(User, {
  foreignKey: 'recipientId',
  as: 'recipient',
});

Conversation.hasMany(Message, { foreignKey: 'conversationId', as: 'messages' });
Message.belongsTo(Conversation, {
  foreignKey: 'conversationId',
  as: 'conversation',
});

export { User, Conversation };
