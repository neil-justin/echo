import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircleMore } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavLink } from 'react-router';
import classNames from 'classnames';

interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  avatar?: string;
}

interface lastMessageAttribute {
  sender: number;
  content: string;
}

interface DummyConversation {
  id: number;
  participants: DummyUser[];
  lastMessage: lastMessageAttribute;
}

const Sidebar = () => {
  const dummyLoggedInUser: DummyUser = {
    id: 1,
    firstName: 'Neil Justin',
    lastName: 'Mallari',
  };

  const dummyConversations: DummyConversation[] = [
    {
      id: 1,
      participants: [
        {
          id: 1,
          firstName: 'Neil Justin',
          lastName: 'Mallari',
        },
        {
          id: 2,
          firstName: 'John',
          lastName: 'Doe',
          avatar: 'https://github.com/shadcn.png',
        },
      ],
      lastMessage: {
        sender: 2,
        content: 'Hi Neil. How are you doing?',
      },
    },
    {
      id: 2,
      participants: [
        {
          id: 1,
          firstName: 'Neil Justin',
          lastName: 'Mallari',
        },
        {
          id: 3,
          firstName: 'Johnny',
          lastName: 'Doe',
        },
      ],
      lastMessage: {
        sender: 1,
        content: 'Have you seen that person before?',
      },
    },
  ];

  return (
    <Tabs
      defaultValue='chats'
      className='flex-row h-full'
    >
      <TabsList className='h-full flex flex-col justify-between p-2 rounded-none'>
        {/* Inbox switcher */}
        <div className='grid'>
          <TabsTrigger
            value='chats'
            className='h-fit p-4'
          >
            <MessageCircleMore className='scale-150' />
          </TabsTrigger>
        </div>
        <div>
          {/* Placeholder for theme switcher */}
          <p>test</p>
        </div>
      </TabsList>
      <TabsContent
        value='chats'
        className='px-2 py-4 flex flex-col gap-3'
      >
        <h1 className='text-2xl font-bold'>Chats</h1>
        <Input
          type='text'
          placeholder='Search Echo'
          className='rounded-full w-full'
        />
        {/* Conversation list */}
        <div className='flex flex-col gap-2'>
          {dummyConversations.map((conversation) => {
            console.log(conversation.id);
            const recipient =
              dummyLoggedInUser.id === conversation.participants[0].id
                ? conversation.participants[1]
                : conversation.participants[0];

            return (
              <NavLink
                to={`/chats/${conversation.id}`}
                className={({ isActive }) =>
                  classNames('flex gap-2 p-2 rounded-md', { 'bg-gray-200': isActive })
                }
                key={conversation.id}
              >
                <Avatar className='size-12'>
                  <AvatarImage
                    src={recipient.avatar}
                    alt={`@${recipient.firstName}`}
                  />
                  <AvatarFallback>
                    {/* Gets the initial letter of first and last names
                     e.g., Neil Justin --> NJ */}
                    {`${recipient.firstName.substring(
                      0,
                      1
                    )}${recipient.lastName.substring(0, 1)}`}
                  </AvatarFallback>
                </Avatar>
                {/* min-w value is arbitrary */}
                <div>
                  <p className='whitespace-nowrap'>{`${recipient.firstName} ${recipient.lastName}`}</p>
                  <p className='text-gray-600 text-sm whitespace-nowrap'>
                    {dummyLoggedInUser.id === conversation.lastMessage.sender
                      ? `You: ${conversation.lastMessage.content}`
                      : `${conversation.lastMessage.content}`}
                  </p>
                </div>
              </NavLink>
            );
          })}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Sidebar;
