import Convo from '@/components/Convo';
import Sidebar from '@/components/Sidebar';
import { UserDB } from '@/types';
import { useState } from 'react';

interface ChatsProps {
  loggedinUser: UserDB | null;
}

const Chats = ({ loggedinUser }: ChatsProps) => {
  const [recipient, setRecipient] = useState<UserDB | null | undefined>(null);
  
  if (!loggedinUser) return;

  return (
    <div className='grid grid-cols-[30%_70%] h-screen bg-muted'>
      <Sidebar
        updateRecipient={setRecipient}
        loggedinUser={loggedinUser}
      />
      {recipient ? (
        <Convo recipient={recipient} />
      ) : (
        <div className='w-full h-full flex items-center justify-center'>
          <h2 className='font-bold text-2xl'>Welcome to Echo</h2>
        </div>
      )}
    </div>
  );
};

export default Chats;
