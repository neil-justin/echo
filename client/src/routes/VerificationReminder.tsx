import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserDB } from '@/types';
import { NavLink } from 'react-router';

interface VerificationReminderProps {
  user: UserDB | null;
}

const VerificationReminder = ({ user }: VerificationReminderProps) => {
  if (!user) return;

  return (
    <div className='h-screen flex justify-center items-center'>
      <Card>
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            We just sent an email to the address: <i>{user.email}</i>
            <br />
            Please check your email and click on the link provided to verify
            your email
          </p>
        </CardContent>
        <CardFooter>
          <p>
            Already verified your account?{' '}
            <NavLink
              to='/auth/login'
              className='text-blue-600 hover:underline'
            >
              Log in
            </NavLink>{' '}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerificationReminder;
