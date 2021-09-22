import { FormikHelpers } from 'formik';
import AccountWrapper from '../../../components/AccountWrapper/AccountWrapper';
import login from '../../../helpers/APICalls/login';
import LoginForm from '../AuthForm/LoginForm/LoginForm';
import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';

export default function Login(): JSX.Element {
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };
  return (
    <AccountWrapper isLogin>
      <LoginForm handleSubmit={handleSubmit} />
    </AccountWrapper>
  );
}
