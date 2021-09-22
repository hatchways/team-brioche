import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';
import { Profile } from '../../interface/Profile';
interface Props {
  id: string;
}
interface UpdateProfile {
  firstName?: string;
  lastName?: string;
  gender?: string;
  phone?: number;
  address?: string;
  description?: string;
  availability?: [string];
}
const profileCreate = async (
  firstName: string,
  lastName: string,
  gender: string,
  phone: number,
  address: string,
  description: string,
  availability: [string],
): Promise<AuthApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, gender, phone, address, description, availability }),
    credentials: 'include',
  };
  return await fetch(`/profile`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
export async function profileGet({ id }: Props): Promise<Profile> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function profileUpdate(updatedData: UpdateProfile, id: string): Promise<Profile> {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(updatedData),
  };
  return await fetch(`/profile/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to connect.Please try again' } }));
}

export default profileCreate;
