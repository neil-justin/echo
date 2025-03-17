import AuthForm from '@/components/AuthForm';
import { auth } from '@/firebase';
import { AuthFormInput } from '@/types';
import { signInWithEmailAndPassword, User } from 'firebase/auth';

const Login = () => {
  const loginUser = async (user: AuthFormInput): Promise<User> => {
    const { email, password } = user;

    return (await signInWithEmailAndPassword(auth, email, password)).user;
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
