import { Route, Routes } from 'react-router';
import Register from '@/routes/Register';
import VerificationReminder from './routes/VerificationReminder';
import { useState } from 'react';
import { User } from 'firebase/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Routes>
      <Route path='auth'>
        <Route
          path='register'
          element={<Register updateUser={setUser} />}
        />
        <Route
          path='verification-reminder'
          element={<VerificationReminder user={user} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
