import { FetchOptions } from '../../interface/FetchOptions';
import { Profile, ProfileCreateSuccess } from '../../interface/Profile';
interface Props {
  id: string;
}
export async function profileCreate(
  firstName?: string,
  lastName?: string,
  gender?: string,
  introduction?: string,
  pitch?: string,
  phone?: number,
  address?: string,
  description?: string,
): Promise<ProfileCreateSuccess> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName,
      lastName,
      gender,
      introduction,
      pitch,
      phone,
      address,
      description,
    }),
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
export async function profileGetByUser(): Promise<ProfileCreateSuccess> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/users/profile/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'User does not have Profile' },
    }));
}

// eslint-disable-next-line
export async function updateAvailability({ weeklyTimeRange, rate }: any): Promise<any> {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ weeklyTimeRange, rate }),
  };
  return await fetch(`/availability/`, fetchOptions);
}
export async function profileUpdate(
  profileId: string | null | undefined,
  { firstName, lastName, gender, isSitter, introduction, pitch, phone, address, description, availability }: Profile,
): Promise<Profile> {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      profileId: profileId,
      firstName,
      lastName,
      gender,
      introduction,
      isSitter,
      pitch,
      phone,
      address,
      description,
      availability,
    }),
  };
  return await fetch(`/profile/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to connect.Please try again' } }));
}
