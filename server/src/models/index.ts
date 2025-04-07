import User from '@/models/user';
import Conversation from '@/models/conversation';

User.belongsToMany(Conversation, { through: 'user_conversations' });
Conversation.belongsToMany(User, { through: 'user_conversations' });

export { User, Conversation };
