import { GetProfileApi } from '../../interface/GetProfileApi';
import { FetchOptions } from '../../interface/FetchOptions';

const profilePhoto = async (): Promise<GetProfileApi> => {
  const fetchOptions: FetchOptions = {
    method: 'Get',
    credentials: 'include',
  };
  return await fetch(`/profile/get-profile`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default profilePhoto;
