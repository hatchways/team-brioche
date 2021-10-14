import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthApiData, AuthApiDataSuccess } from '../interface/AuthApiData';
import { User } from '../interface/User';
import { Profile } from '../interface/Profile';
import loginWithCookies from '../helpers/APICalls/loginWithCookies';
import logoutAPI from '../helpers/APICalls/logout';
interface IAuthContext {
  loggedInUser: User | null | undefined;
  updateLoginContext: (data: AuthApiDataSuccess) => void;
  logout: () => void;
  profileData?: Profile | null | undefined;
  updateProfileContext: (data: Profile) => void;
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

  const updateLoginContext = useCallback((data: AuthApiDataSuccess) => {
    setLoggedInUser(data.user);
  }, []);
  const [profileData, setProfileData] = useState<Profile | null | undefined>();

  const updateProfileContext = useCallback((data: Profile | undefined) => {
    setProfileData(data);
  }, []);

  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutAPI()
      .then(() => {
        setLoggedInUser(null);
        setProfileData(null);
        history.push('/login');
      })
      .catch((error) => console.error(error));
  }, [history]);
  useEffect(() => {
    if (profileData?._id && !profileData?.firstName) {
      history.push('/edit-profile');
    } else if (!profileData?.availability?.weeklyTimeRange) {
      history.push('/edit-profile/availability');
    } else {
      history.push('/dashboard');
    }
  }, [history, profileData]);

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const checkLoginWithCookies = async () => {
      await loginWithCookies().then((data: AuthApiData) => {
        if (data.success) {
          updateLoginContext(data.success);
          updateProfileContext(data.profile);
        } else {
          // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
          setLoggedInUser(null);
          if (location.pathname !== '/signup') {
            history.push('/login');
          }
        }
      });
    };
    checkLoginWithCookies();
  }, [updateLoginContext, location.pathname, updateProfileContext, history]);

  return (
    <AuthContext.Provider value={{ loggedInUser, updateLoginContext, profileData, updateProfileContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
