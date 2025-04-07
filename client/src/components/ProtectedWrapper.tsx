import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { UserDB } from '@/types';

interface ProtectedWrapperProps {
  updateUser: React.Dispatch<React.SetStateAction<UserDB | null>>;
}

const ProtectedWrapper = ({ updateUser }: ProtectedWrapperProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('user-token');

    if (!token) {
      navigate('/auth/login');
    } else {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;

      // If the token is not expired, redirect to the chats page
      if (decodedToken.exp && decodedToken.exp >= currentTime) {
        const userId = localStorage.getItem('user-id') as string;

        updateUser({ id: userId });

        navigate('/chats');
      } else {
        localStorage.removeItem('user-token');
        localStorage.removeItem('user-id');

        navigate('/auth/login');
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Outlet />;
};

export default ProtectedWrapper;
