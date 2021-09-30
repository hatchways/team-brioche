export interface ProfilePhotoApiSuccess {
  profilePic: string;
}

export interface ProfilePhotoApi {
  error?: { message: string };
  success?: ProfilePhotoApiSuccess;
}
