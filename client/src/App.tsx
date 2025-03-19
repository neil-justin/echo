import { Route, Routes } from 'react-router';
import Register from '@/routes/Register';
import VerificationReminder from './routes/VerificationReminder';
import { useState } from 'react';
import { User } from 'firebase/auth';
import Login from '@/routes/Login';
import ProtectedAuthWrapper from './components/ProtectedAuthWrapper';

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Routes>
      <Route
        path='auth'
        element={<ProtectedAuthWrapper />}
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
    </Routes>
  );
}

export default App;
