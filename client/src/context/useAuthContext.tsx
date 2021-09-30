import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
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

  const updateLoginContext = useCallback(
    (data: AuthApiDataSuccess) => {
      setLoggedInUser(data.user);
      history.push('/dashboard');
    },
    [history],
  );
  const [profileData, setProfileData] = useState<ProfileCreated | null | undefined>();

  const updateProfileContext = useCallback(
    (data: ProfileCreateSuccess) => {
      setProfileData(data?.profile);
      history.push(`/edit-profile/availability`);
    },
    [history],
  );

  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutAPI()
      .then(() => {
        history.push('/login');
        setLoggedInUser(null);
        setProfileData(null);
      })
      .catch((error) => console.error(error));
  }, [history]);

  useEffect(() => {
    const hasProfile = async () => {
      await profileGetByUser().then((data: ProfileCreateSuccess) => {
        if (data.profile) {
          updateProfileContext(data);
          history.push('/edit-profile/availability');
        } else if (data.error) {
          history.push('/edit-profile');
        }
      });
    };
    hasProfile();
  }, [history, loggedInUser, updateProfileContext]);

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const checkLoginWithCookies = async () => {
      await loginWithCookies().then((data: AuthApiData) => {
        if (data.success) {
          updateLoginContext(data.success);
          if (profileData) {
            history.push(`/dashboard`);
          } else {
            history.push(`/edit-profile/availability`);
          }
        } else {
          // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
          setLoggedInUser(null);
          history.push('/login');
        }
      });
    };
    checkLoginWithCookies();
  }, [updateLoginContext, history, profileData]);

  return (
    <AuthContext.Provider value={{ loggedInUser, updateLoginContext, profileData, updateProfileContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
