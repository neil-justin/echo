import AuthForm from '@/components/AuthForm';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  validatePassword,
} from 'firebase/auth';
import { auth } from '@/firebase';
import { FirebaseError } from 'firebase/app';
import { useMutation } from '@apollo/client';
import { AuthFormInput, UserDB } from '@/types';
import { gql } from '@/__generated__/gql';

interface RegisterProps {
  updateUser: React.Dispatch<React.SetStateAction<UserDB | null | undefined>>;
}

const Register = ({ updateUser }: RegisterProps) => {
  const ADD_USER = gql(`
    mutation AddUser(
      $uid: String!
      $email: String!
      $firstName: String!
      $lastName: String!
    ) {
      addUser(
        uid: $uid
        email: $email
        firstName: $firstName
        lastName: $lastName
      ) {
        code
        success
        message
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

  const [addUser] = useMutation(ADD_USER);

  const registerUser = async (user: AuthFormInput) => {
    const { email, password, firstName, lastName } = user;
    const currentUser = auth.currentUser;

    if (currentUser) {
      throw new FirebaseError(
        'auth/email-already-exists',
        'This account already exists in our database. Please sign in instead.'
      );
    }

    const { isValid } = await validatePassword(auth, password);

    if (isValid) {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(firebaseUser);

      addUser({
        variables: {
          uid: firebaseUser.uid,
          email: firebaseUser.email as string,
          firstName: firstName as string,
          lastName: lastName as string,
        },
        onCompleted: (data) => {
          if (data.addUser?.success && data.addUser.user) {
            updateUser(data.addUser.user);
          }
        },
      });
    } else {
      throw new FirebaseError(
        'auth/weak-password',
        'Weak password. Please enter a stronger password.'
      );
    }
  };

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <AuthForm
          authFor='Register'
          authFn={registerUser}
        />
      </div>
    </div>
  );
};

export default Register;
