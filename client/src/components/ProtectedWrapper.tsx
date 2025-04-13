import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { UserDB } from '@/types';
import { useLazyQuery } from '@apollo/client';
import { gql } from '@/__generated__/gql';

const GET_USER = gql(`
  query GetUser($userId: String!) {
    user(userId: $userId) {
      user {
        id
        firstName
        lastName
      }
    }
  }  
`);

interface ProtectedWrapperProps {
  updateUser: React.Dispatch<React.SetStateAction<UserDB | null | undefined>>;
}

const ProtectedWrapper = ({ updateUser }: ProtectedWrapperProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [getUser, { data: userData, called: userQueryCalled }] =
    useLazyQuery(GET_USER);

  useEffect(() => {
    const token = localStorage.getItem('user-token');

    if (!token) {
      navigate('/auth/login');
    } else {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;

      // If the token is not expired
      if (decodedToken.exp && decodedToken.exp >= currentTime) {
        const userId = localStorage.getItem('user-id') as string;

        getUser({ variables: { userId } });

        // If user is at auth page i.e., login or registration page
        if (location.pathname.split('/')[1] === 'auth') {
          navigate('/chats');
        }
      } else {
        localStorage.removeItem('user-token');
        localStorage.removeItem('user-id');
        localStorage.removeItem('conversation-id');
        localStorage.removeItem('recipient');

        navigate('/auth/login');
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userQueryCalled) {
      updateUser(userData?.user.user);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, userQueryCalled]);

  return <Outlet />;
};

export default ProtectedWrapper;
