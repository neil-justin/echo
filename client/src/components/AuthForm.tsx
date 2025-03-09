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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const authFormSchema = z
  .object({
    email: z.string().email('Must be a valid email address'),
    password: z.string().min(8, {
      message:
        'Password must be at least 8 characters long including special characters, numbers, lowercase and uppercase letters',
    }),
  })
  .required();

interface AuthFormProps {
  authFor: 'Register';
}

const AuthForm = ({ authFor }: AuthFormProps) => {
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onFormSubmit = (values: z.infer<typeof authFormSchema>) => {
    console.log(values);
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
                <a
                  href='#'
                  className='underline underline-offset-4'
                >
                  {authFor === 'Register' ? 'Login' : 'Register'}
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
