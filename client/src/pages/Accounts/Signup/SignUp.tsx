import UserAccountWrapper from '../../../components/UserAccountWrapper/UserAccountWrapper';
import SignUpForm from '../AuthForm/SignupForm/SignUpForm';

export default function Register(): JSX.Element {
  return (
    <UserAccountWrapper>
      {(handleLogin, handleRegister) => <SignUpForm handleSubmit={handleRegister} />}
    </UserAccountWrapper>
  );
}
