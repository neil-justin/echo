import { Route, Routes } from 'react-router';
import Register from '@/routes/Register';

function App() {
  return (
    <Routes>
      <Route path='auth'>
        <Route
          path='register'
          element={<Register />}
        />
      </Route>
    </Routes>
  );
}

export default App;
