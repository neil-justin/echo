import AuthForm from '@/components/AuthForm';
import { auth } from '@/firebase';
import { AuthFormInput } from '@/types';
import { gql, useMutation } from '@apollo/client';
import { signInWithEmailAndPassword, User } from 'firebase/auth';

const Login = () => {
  const GENERATE_TOKEN = gql`
    mutation GenerateToken($email: String!) {
      generateToken(email: $email) {
        code
        success
        message
        token
      }
    }
  `;

  const [generateToken] = useMutation(GENERATE_TOKEN, {
    update(_cache, { data: { generateToken } }) {
      if (generateToken.success) {
        localStorage.setItem('user-token', generateToken.token);
      }
    },
  });

  const loginUser = async (user: AuthFormInput): Promise<User> => {
    const { email, password } = user;

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    generateToken({
      variables: {
        email,
      },
    });

    return userCredential.user;
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
