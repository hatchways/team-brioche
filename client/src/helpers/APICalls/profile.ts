import { FetchOptions } from '../../interface/FetchOptions';
import { Profile, ProfileCreateSuccess } from '../../interface/Profile';
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
  error?: { message: string };
}
export async function profileCreate(
  firstName: string,
  lastName: string,
  gender: string,
  phone: number,
  address: string,
  description: string,
  availability: [string],
): Promise<ProfileCreateSuccess> {
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
}
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

export async function profileUpdate(
  { firstName, lastName, gender, phone, address, description, availability }: UpdateProfile,
  id: string,
): Promise<UpdateProfile> {
  console.log({ firstName, lastName, gender, phone, address, description, availability });
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, gender, phone, address, description, availability }),
  };
  return await fetch(`/profile/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to connect.Please try again' } }));
}
