import { Profile } from './Profile';
import { User } from './User';

export interface AuthApiDataSuccess {
  message: string;
  user: User;
  token: string;
}

export interface AuthApiData {
  error?: { message: string };
  success?: AuthApiDataSuccess;
  profile: Profile;
}
