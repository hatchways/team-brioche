export interface GetProfileApiSuccess {
  profile: any;
}

export interface GetProfileApi {
  error?: { message: string };
  success?: GetProfileApiSuccess;
}
