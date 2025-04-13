import Convo from '@/components/Convo';
import Sidebar from '@/components/Sidebar';
import { UserDB } from '@/types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

interface ChatsProps {
  loggedinUser: UserDB | null | undefined;
}

const Chats = ({ loggedinUser }: ChatsProps) => {
  const [recipient, setRecipient] = useState<UserDB | null | undefined>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    const storedConversationId = localStorage.getItem('conversation-id');
    let storedRecipient = localStorage.getItem('recipient');

    if (storedRecipient) {
      storedRecipient = JSON.parse(storedRecipient);
    }

    if (
      !conversationId &&
      storedConversationId &&
      !recipient &&
      storedRecipient
    ) {
      setConversationId(storedConversationId);
      // storedRecipient is surely a UserDB instance now after parsing (see above)
      setRecipient(storedRecipient as unknown as UserDB);
    }
  }, [conversationId, recipient]);

  if (!loggedinUser) return;

  return (
    <div className='grid grid-cols-[30%_70%] h-screen bg-muted'>
      <Sidebar
        updateRecipient={setRecipient}
        loggedinUser={loggedinUser}
        updateConversationId={setConversationId}
      />
      {recipient &&
      conversationId &&
      location.pathname.split('/')[2] === conversationId ? (
        <Convo
          recipient={recipient}
          loggedinUser={loggedinUser}
          conversationId={conversationId}
        />
      ) : (
        <div className='w-full h-full flex items-center justify-center'>
          <h2 className='font-bold text-2xl'>Welcome to Echo</h2>
        </div>
      )}
    </div>
  );
};

export default Chats;
