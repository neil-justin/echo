import AuthForm from '@/components/AuthForm';

const Register = () => {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <AuthForm authFor='Register' />
      </div>
    </div>
  );
};

export default Register;
