import Sidebar from '@/components/Sidebar';

const Chats = () => {
  return (
    <div className='grid grid-cols-[30%_70%] h-screen'>
      <Sidebar />
      <div className='w-full bg-green-50'></div>
    </div>
  );
};

export default Chats;
