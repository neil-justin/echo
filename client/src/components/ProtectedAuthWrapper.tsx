import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { jwtDecode } from "jwt-decode";


const ProtectedAuthWrapper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('user-token');

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp > currentTime) {
        navigate('/');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Outlet />;
};

export default ProtectedAuthWrapper;
