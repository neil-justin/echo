import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const ProtectedWrapper = () => {
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
        navigate('/chats');
      } else {
        navigate('/auth/login');
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Outlet />;
};

export default ProtectedWrapper;
