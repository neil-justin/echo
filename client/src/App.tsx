import { Route, Routes } from 'react-router';
import Register from '@/routes/Register';
import VerificationReminder from './routes/VerificationReminder';
import { useState } from 'react';
import Login from '@/routes/Login';
import ProtectedWrapper from './components/ProtectedWrapper';
import Chats from '@/routes/Chats';
import { UserDB } from './types';
import { useEffect } from 'react';
import { socket } from '@/socket';

function App() {
  const [user, setUser] = useState<UserDB | null | undefined>(null);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Routes>
      <Route
        path='auth'
        element={<ProtectedWrapper updateUser={setUser} />}
      >
        <Route
          path='register'
          element={<Register updateUser={setUser} />}
        />
        <Route
          path='verification-reminder'
          element={<VerificationReminder user={user} />}
        />
        <Route
          path='login'
          element={<Login updateUser={setUser} />}
        />
      </Route>
      <Route element={<ProtectedWrapper updateUser={setUser} />}>
        <Route
          path='chats/:id?'
          element={<Chats loggedinUser={user} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
