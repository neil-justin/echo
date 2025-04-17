import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
} from '@chatscope/chat-ui-kit-react';
import { UserDB } from '@/types';
import { Ellipsis, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Archive } from 'lucide-react';
import { useMutation, useQuery } from '@apollo/client';
import { gql } from '@/__generated__/gql';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

interface MessageData {
  __typename?: string;
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
}

interface ConvoProps {
  recipient: UserDB;
  loggedinUser: UserDB;
  conversationId: string;
}

const SEND_MESSAGE = gql(`
  mutation SendMessage($senderId: String!, $recipientId: String!, $message: String!) {
    sendMessage(senderId: $senderId, recipientId: $recipientId, message: $message) {
      message {
        id
        senderId
        recipientId
        content
      }
      conversation {
        id
      }
    }
  }
`);

const GET_CONVERSATION_MESSAGES = gql(`
  query GetConversationMessages($conversationId: String!) {
    conversationMessages(conversationId: $conversationId) {
      messages {
        id
        senderId
        recipientId
        content
      }
    }
  }  
`);

const Convo = ({ recipient, loggedinUser, conversationId }: ConvoProps) => {
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const { data: messagesData, called: messagesQueryCalled } = useQuery(
    GET_CONVERSATION_MESSAGES,
    {
      variables: { conversationId },
    }
  );

  const [messages, setMessages] = useState<MessageData[]>([]);

  const location = useLocation();

  useEffect(() => {
    if (messagesQueryCalled && messagesData?.conversationMessages.messages) {
      setMessages(messagesData?.conversationMessages.messages);
    }
  }, [messagesData?.conversationMessages.messages, messagesQueryCalled]);

  const navigate = useNavigate();

  const handleSendMessage = (message: string) => {
    sendMessage({
      variables: {
        senderId: loggedinUser.id,
        recipientId: recipient.id,
        message,
      },
      onCompleted: ({ sendMessage }) => {
        setMessages([...messages, sendMessage.message]);

        if (location.pathname.split('/')[2] !== conversationId) {
          navigate(`/chats/${sendMessage.conversation.id}`);
        }
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
        {messages.map((message) => (
          <Message
            key={message.id}
            model={{
              message: message.content,
              sender: message.senderId,
              direction:
                message.senderId === loggedinUser.id ? 'outgoing' : 'incoming',
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
