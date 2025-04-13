import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
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

  const [getUser, { data: userData, called: userQueryCalled }] =
    useLazyQuery(GET_USER);

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

        getUser({ variables: { userId } });

        navigate('/chats');
      } else {
        localStorage.removeItem('user-token');
        localStorage.removeItem('user-id');

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
