import UserAccountWrapper from '../../../components/UserAccountWrapper/UserAccountWrapper';
import LoginForm from '../AuthForm/LoginForm/LoginForm';

export default function Login(): JSX.Element {
  return (
    <UserAccountWrapper isLoginForm>{(handleLogin) => <LoginForm handleSubmit={handleLogin} />}</UserAccountWrapper>
  );
}
