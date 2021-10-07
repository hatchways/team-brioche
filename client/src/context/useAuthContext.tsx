import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthApiData, AuthApiDataSuccess } from '../interface/AuthApiData';
import { User } from '../interface/User';
import { ProfileCreated, ProfileCreateSuccess } from '../interface/Profile';
import loginWithCookies from '../helpers/APICalls/loginWithCookies';
import logoutAPI from '../helpers/APICalls/logout';
import { profileGetByUser } from '../helpers/APICalls/profile';

interface IAuthContext {
  loggedInUser: User | null | undefined;
  updateLoginContext: (data: AuthApiDataSuccess) => void;
  logout: () => void;
  profileData?: ProfileCreated | null | undefined;
  updateProfileContext: (data: ProfileCreateSuccess) => void;
}

export const AuthContext = createContext<IAuthContext>({
  loggedInUser: undefined,
  updateLoginContext: () => null,
  logout: () => null,
  profileData: undefined,
  updateProfileContext: () => null,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
  const history = useHistory();
  const location = useLocation();

  const updateLoginContext = useCallback(
    (data: AuthApiDataSuccess) => {
      setLoggedInUser(data.user);
      history.push(`/profiles/615de736d5ca288688b1fe63`);
    },
    [history],
  );
  const [profileData, setProfileData] = useState<ProfileCreated | null | undefined>();

  const updateProfileContext = useCallback(
    (data: ProfileCreateSuccess) => {
      setProfileData(data?.profile);
      history.push(`/profiles/615de736d5ca288688b1fe63`);
    },
    [history],
  );

  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutAPI()
      .then(() => {
        //history.push('/login');
        setLoggedInUser(null);
        setProfileData(null);
      })
      .catch((error) => console.error(error));
  }, []);

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const checkLoginWithCookies = async () => {
      await loginWithCookies().then((data: AuthApiData) => {
        if (data.success) {
          updateLoginContext(data.success);
          history.push(`/profiles/615de736d5ca288688b1fe63`);
          // } else {
          //   history.push(`/edit-profile`);
          // }
          // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
          //setLoggedInUser(null);
          // if (location.pathname !== '/signup') {
          //   history.push('/login');
          // }
        }
      });
    };
    checkLoginWithCookies();
  }, [history, location.pathname, profileData, updateLoginContext]);

  return (
    <AuthContext.Provider value={{ loggedInUser, updateLoginContext, profileData, updateProfileContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
