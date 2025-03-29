import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
} from '@chatscope/chat-ui-kit-react';
import { DummyUser } from '@/types';
import { Ellipsis } from 'lucide-react';
import { Button } from './ui/button';

// interface dummyMessage {
//   id: 1
//   senderId: 1
//   recipientId: 2
//   content: string
// }

interface ConvoProps {
  recipient: DummyUser;
}

const Convo = ({ recipient }: ConvoProps) => {
  return (
    <ChatContainer className='rounded-3xl'>
      <ConversationHeader>
        <ConversationHeader.Content
          userName={`${recipient.firstName} ${recipient.lastName}`}
        />
        <ConversationHeader.Actions>
          <Button
            variant='ghost'
            className='hover:cursor-pointer'
          >
            <Ellipsis />
          </Button>
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList className='dark:bg-primary'>
        <Message
          model={{
            message: 'Hello my friend',
            sentTime: 'just now',
            sender: 'Joe',
            direction: 'incoming',
            position: 'single',
          }}
        />
      </MessageList>
      <MessageInput
        attachButton={false}
        placeholder='Type message here'
      />
    </ChatContainer>
  );
};

export default Convo;
