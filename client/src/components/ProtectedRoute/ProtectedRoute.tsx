import { FunctionComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

type ProtectedRouteProps = {
  exact?: boolean;
  component?: FunctionComponent;
  path: string;
};

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({ children, component, ...rest }): JSX.Element => {
  const { loggedInUser } = useAuth();
  const Component = component;
  if (loggedInUser) {
    return <Route {...rest} render={() => (Component ? <Component /> : children)} />;
  }
  return (
    <Route {...rest} render={({ location }) => <Redirect to={{ pathname: '/login', state: { from: location } }} />} />
  );
};

export default ProtectedRoute;
