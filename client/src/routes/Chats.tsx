import Convo from '@/components/Convo';
import Sidebar from '@/components/Sidebar';
import { DummyUser } from '@/types';
import { useState } from 'react';

const Chats = () => {
  const [recipient, setRecipient] = useState<DummyUser | null>(null);

  return (
    <div className='grid grid-cols-[30%_70%] h-screen bg-muted'>
      <Sidebar updateRecipient={setRecipient} />
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
