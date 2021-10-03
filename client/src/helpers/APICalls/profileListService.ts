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
  const body = GenerateReqBody(addressQuery, range);
  const options: FetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  };
  const res = await fetch('/profile/search', options);
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
}

function GenerateReqBody(addressQuery: string, range: DayRange): ReqBody {
  let body: ReqBody = { address: addressQuery || '' };

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-Us', { dateStyle: 'full' });
  const dropInDate = range.dropInDate as string;
  const dropOffDate = range.dropOffDate as string;
  if (isValidDateString(dropInDate)) body = { ...body, dropInDate: formatDate(dropInDate) };
  if (isValidDateString(dropOffDate)) body = { ...body, dropOffDate: formatDate(dropOffDate) };
  return body;
}
