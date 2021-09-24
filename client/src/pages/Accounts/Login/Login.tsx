import { Fragment } from 'react';
import DemoUser from '../../../components/DemoUser/DemoUser';
import Redirect from '../../../components/Redirect/Redirect';
import UserAccountWrapper from '../../../components/UserAccountWrapper/UserAccountWrapper';
import LoginForm from '../AuthForm/LoginForm/LoginForm';

export default function Login(): JSX.Element {
  return (
    <UserAccountWrapper title="Login">
      {(handleLogin) => (
        <Fragment>
          <LoginForm handleSubmit={handleLogin} />
          <Redirect asideText="Dont have an account?" buttonText="Sign up" to="/signup" />
          <DemoUser />
        </Fragment>
      )}
    </UserAccountWrapper>
  );
}
