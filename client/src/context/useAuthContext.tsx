import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid } from '@material-ui/core';
import { AuthApiDataSuccess } from '../interface/AuthApiData';
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
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
  const [profileData, setProfileData] = useState<Profile | null | undefined>();
  const [isFetchingUser, setIsFetchingUser] = useState(true);

  const history = useHistory();

  const updateLoginContext = useCallback((data: AuthApiDataSuccess) => {
    setLoggedInUser(data.user);
  }, []);

  const updateProfileContext = useCallback((data: Profile | undefined) => {
    setProfileData(data);
  }, []);

  const logout = useCallback(async () => {
    await logoutAPI()
      .then(() => {
        setLoggedInUser(null);
        setProfileData(null);
        history.push('/login');
      })
      .catch((error) => console.error(error));
  }, [history]);

  useEffect(() => {
    if (loggedInUser) {
      if (!profileData?.firstName) history.push('/profile-settings/edit-profile');
      else if (profileData?.isSitter && !profileData?.availability?.weeklyTimeRange)
        history.push('/profile-settings/availability');
    }
  }, [history, profileData, loggedInUser]);

  useEffect(() => {
    setIsFetchingUser(true);
    const checkLoginWithCookies = async () => {
      await loginWithCookies()
        .then((data) => {
          if (data.success) {
            updateLoginContext(data.success);
            updateProfileContext(data.profile);
          } else {
            setLoggedInUser(null);
          }
          setIsFetchingUser(false);
        })
        .catch(() => setIsFetchingUser(false));
    };
    checkLoginWithCookies();
  }, [updateLoginContext, updateProfileContext]);

  if (isFetchingUser) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <CircularProgress size="10rem" />
      </Grid>
    );
  }

  return (
    <AuthContext.Provider value={{ loggedInUser, updateLoginContext, profileData, updateProfileContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
