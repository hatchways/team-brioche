import { FetchOptions } from '../../interface/FetchOptions';
import { Profile } from '../../interface/Profile';
import { isValidDateString } from '../dateTimeHelper';
import { DayRange } from './../../interface/Profile';

interface ProfileResponse {
  profiles: Profile[];
  uniqueAddress: string[];
}

interface ReqBody {
  address: string;
  dropInDate?: string;
  dropOffDate?: string;
}

export async function getProfileList(addressQuery: string, range: DayRange): Promise<ProfileResponse> {
  let body: ReqBody = { address: addressQuery };
  if (isValidDateString(range.dropInDate as string)) body = { ...body, dropInDate: range.dropInDate };
  if (isValidDateString(range.dropOffDate as string)) body = { ...body, dropOffDate: range.dropOffDate };

  const options: FetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  };

  try {
    const res = await fetch('/profile/search', options);
    if (res.status !== 200) throw new Error('something went wrong');
    return await res.json();
  } catch (error) {
    throw new Error('something went Wrong');
  }
}
