import { Route, Routes } from 'react-router';
import Register from '@/routes/Register';
import VerificationReminder from './routes/VerificationReminder';
import { useState } from 'react';
import { User } from 'firebase/auth';
import Login from '@/routes/Login';
import ProtectedWrapper from './components/ProtectedWrapper';
import Chats from '@/routes/Chats';

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Routes>
      <Route
        path='auth'
        element={<ProtectedWrapper />}
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
          element={<Login />}
        />
      </Route>
      <Route element={<ProtectedWrapper />}>
        <Route
          path='chats'
          element={<Chats />}
        />
      </Route>
    </Routes>
  );
}

export default App;
