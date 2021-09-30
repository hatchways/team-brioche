import { Fragment } from 'react';
import DemoUser from '../../../components/DemoUser/DemoUser';
import Redirect from '../../../components/Redirect/Redirect';
import UserAccountWrapper from '../../../components/UserAccountWrapper/UserAccountWrapper';
import SignUpForm from '../AuthForm/SignupForm/SignUpForm';

export default function Register(): JSX.Element {
  return (
    <UserAccountWrapper title="Sign up">
      {(handleLogin, handleRegister) => (
        <Fragment>
          <SignUpForm handleSubmit={handleRegister} />
          <Redirect asideText="Already have an account?" buttonText="Login" to="/login" />
          <DemoUser />
        </Fragment>
      )}
    </UserAccountWrapper>
  );
}
