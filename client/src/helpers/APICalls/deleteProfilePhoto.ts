import { DeleteProfilePhotoApi } from '../../interface/DeleteProfilePhotoApi';
import { FetchOptions } from '../../interface/FetchOptions';

const deleteProfilePhoto = async (): Promise<DeleteProfilePhotoApi> => {
  const fetchOptions: FetchOptions = {
    method: 'DELETE',
    credentials: 'include',
  };
  return await fetch(`/profile/delete-photo`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default deleteProfilePhoto;
