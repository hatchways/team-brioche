import { ProfilePhotoApi } from '../../interface/ProfilePhotoApi';
import { FetchOptions } from '../../interface/FetchOptions';

const profilePhoto = async (formData: FormData): Promise<ProfilePhotoApi> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    body: formData,
    credentials: 'include',
  };
  return await fetch(`/profile/save-photo`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default profilePhoto;
