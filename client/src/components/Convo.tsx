import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
} from '@chatscope/chat-ui-kit-react';
import { DummyUser, UserDB } from '@/types';
import { Ellipsis, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Archive } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { gql } from '@/__generated__/gql';
import { useNavigate } from 'react-router';

interface DummyMessage {
  id: number;
  senderId: number;
  recipientId: number;
  content: string;
}

interface ConvoProps {
  recipient: UserDB;
  loggedinUser: UserDB;
  conversationId: string | null;
}

const SEND_MESSAGE = gql(`
  mutation SendMessage($senderId: String!, $recipientId: String!, $message: String!) {
    sendMessage(senderId: $senderId, recipientId: $recipientId, message: $message) {
      message {
        id
      }
      conversation {
        id
      }
    }
  }
`);

const Convo = ({ recipient, loggedinUser, conversationId }: ConvoProps) => {
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const dummyLoggedInUser: DummyUser = {
    id: 1,
    firstName: 'Neil Justin',
    lastName: 'Mallari',
  };

  const dummyMessages: DummyMessage[] = [
    {
      id: 1,
      senderId: 1,
      recipientId: 2,
      content: 'Hello John',
    },
    {
      id: 2,
      senderId: 1,
      recipientId: 2,
      content: 'Are you home?',
    },
    {
      id: 3,
      senderId: 3,
      recipientId: 1,
      content: 'Hello Neil',
    },
    {
      id: 4,
      senderId: 1,
      recipientId: 3,
      content: 'Hi Johnny',
    },
    {
      id: 5,
      senderId: 1,
      recipientId: 3,
      content: 'How are you doing?',
    },
  ];

  const convoMessages = dummyMessages.filter((message) =>
    // Check if the message's recipient and sender are the logged in user
    // and the opened convo recipient
    [message.senderId, message.recipientId].every((userId) =>
      [dummyLoggedInUser.id, recipient.id].includes(userId)
    )
  );

  const navigate = useNavigate();

  const handleSendMessage = (message: string) => {
    sendMessage({
      variables: {
        senderId: loggedinUser.id,
        recipientId: recipient.id,
        message,
      },
      onCompleted: ({ sendMessage }) => {
        navigate(`/chats/${sendMessage.conversation.id}`);
      },
    });
  };

  return (
    <ChatContainer className='rounded-3xl'>
      <ConversationHeader>
        <ConversationHeader.Content
          userName={`${recipient.firstName} ${recipient.lastName}`}
        />
        <ConversationHeader.Actions>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className='hover:cursor-pointer p-2 rounded-md hover:bg-gray-200 hover:dark:bg-gray-800'>
                <Ellipsis />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mr-5 p-2 bg-muted grid'>
              <DropdownMenuItem className='hover:cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-800 p-2'>
                <span>
                  <Archive />
                </span>
                Archive chat
              </DropdownMenuItem>
              <DropdownMenuItem className='hover:cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-800 p-2'>
                <span>
                  <Trash2 />
                </span>
                Delete chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList className='dark:bg-primary'>
        {convoMessages.map((message) => (
          <Message
            key={message.id}
            model={{
              message: message.content,
              sender: message.senderId.toString(),
              direction:
                message.senderId === dummyLoggedInUser.id
                  ? 'outgoing'
                  : 'incoming',
              position: 'single',
            }}
          />
        ))}
      </MessageList>
      <MessageInput
        attachButton={false}
        placeholder='Type message here'
        onSend={(...onSendArgs) =>
          handleSendMessage(onSendArgs[1] /* Get MessageInput textContent */)
        }
      />
    </ChatContainer>
  );
};

export default Convo;
