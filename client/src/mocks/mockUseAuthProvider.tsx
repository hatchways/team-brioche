import { FunctionComponent } from 'react';
import { AuthContext } from '../context/useAuthContext';
import { mockProfile } from './mockProfile';
import { mockLoggedInUser } from './mockUser';

const MockUseAuthProvider: FunctionComponent = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        loggedInUser: mockLoggedInUser,
        profileData: mockProfile,
        updateLoginContext: jest.fn(),
        logout: jest.fn(),
        updateProfileContext: jest.fn(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default MockUseAuthProvider;
