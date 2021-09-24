import { ProfileResponse } from './ProfileResponse';
export interface GetProfileApiSuccess {
  profile: ProfileResponse;
}

export interface GetProfileApi {
  error?: { message: string };
  success?: GetProfileApiSuccess;
}
