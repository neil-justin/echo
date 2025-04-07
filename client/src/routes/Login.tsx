import AuthForm from '@/components/AuthForm';
import { auth } from '@/firebase';
import { AuthFormInput, UserDB } from '@/types';
import { useMutation } from '@apollo/client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { gql } from '@/__generated__/gql';

interface LoginProps {
  updateUser: React.Dispatch<React.SetStateAction<UserDB | null>>;
}

const Login = ({ updateUser }: LoginProps) => {
  const GENERATE_TOKEN = gql(`
    mutation GenerateToken($email: String!) {
      generateToken(email: $email) {
        code
        success
        message
        token
        user {
          id
          email
          firstName
          lastName
          avatar
        }
      }
    }
  `);

  const [generateToken] = useMutation(GENERATE_TOKEN, {
    update(_cache, result) {
      if (result.data?.generateToken?.success) {
        localStorage.setItem('user-token', result.data.generateToken.token);
      }
    },
  });

  const loginUser = async (user: AuthFormInput) => {
    const { email, password } = user;

    await signInWithEmailAndPassword(auth, email, password);

    generateToken({
      variables: {
        email,
      },
      onCompleted: (data) => {
        if (data.generateToken?.success && data.generateToken.user) {
          updateUser(data.generateToken.user);
        }
      },
    });
  };

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <AuthForm
          authFor='Login'
          authFn={loginUser}
        />
      </div>
    </div>
  );
};

export default Login;
