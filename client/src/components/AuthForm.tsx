import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import { AuthFormInput } from '@/types';
import { authFormSchema } from '@/utils/schema';

interface AuthFormProps {
  authFor: 'Register' | 'Login';
  authFn: (user: AuthFormInput) => Promise<void>;
}

const AuthForm = ({ authFor, authFn }: AuthFormProps) => {
  const form = useForm<AuthFormInput>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      // Conditionally settting default values for Register form
      // This allows Login form to have only email and password fields
      // and work as expected
      ...(authFor === 'Register' && {
        firstName: '',
        lastName: '',
      }),
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const onFormSubmit = async (values: AuthFormInput) => {
    await authFn(values);

    const redirectPath =
      // Replace '/' later after implementing login
      authFor === 'Register' ? '/auth/verification-reminder' : '/chats';

    navigate(redirectPath);
  };

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card>
        <CardHeader>
          <CardTitle>{authFor} to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)}>
              <div className='flex flex-col gap-6'>
                {authFor === 'Register' ? (
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='firstName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='firstName'>First Name</FormLabel>
                          <FormControl>
                            <Input
                              id='firstName'
                              placeholder='John'
                              type='text'
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='lastName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              id='lastName'
                              placeholder='Doe'
                              type='text'
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : null}
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='email'>Email</FormLabel>
                      <FormControl>
                        <Input
                          id='email'
                          placeholder='johndoe@gmail.com'
                          type='email'
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='password'>Password</FormLabel>
                      <FormControl>
                        <Input
                          id='password'
                          placeholder='********'
                          type='password'
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex flex-col gap-3'>
                  <Button
                    type='submit'
                    className='w-full hover:cursor-pointer'
                  >
                    {authFor}
                  </Button>
                </div>
              </div>
              <div className='mt-4 text-center text-sm'>
                Already have an account?{' '}
                <NavLink
                  to={authFor === 'Register' ? '/auth/login' : '/auth/register'}
                  className='underline underline-offset-4 hover:no-underline'
                >
                  {authFor === 'Register' ? 'Login' : 'Register'}
                </NavLink>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
