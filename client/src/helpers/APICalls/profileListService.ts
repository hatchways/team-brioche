import { generateQueryString } from '../queryStringHelpers';
import { FetchOptions } from '../../interface/FetchOptions';
import { Profile } from '../../interface/Profile';
import { DayRange } from './../../interface/Profile';

interface ProfileResponse {
  profiles: Profile[];
  uniqueAddress: string[];
}

export async function getProfileList(addressQuery: string, range: DayRange): Promise<ProfileResponse> {
  const queryString = generateQueryString({
    address: addressQuery,
    dropInDate: range.dropInDate,
    dropOffDate: range.dropOffDate,
  });
  const options: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  const path = queryString ? `/profile?${queryString}` : '/profile';
  try {
    const res = await fetch(path, options);
    const data = await res.json();
    if (res.status !== 200) {
      throw new Error(data.error.message);
    }
    return getUniqueAddress(data);
    // eslint-disable-next-line
  } catch (error: any) {
    throw new Error(error.message);
  }
}

function getUniqueAddress(profiles: Profile[]): ProfileResponse {
  const addressList = profiles.map((profile) => profile.address);
  return {
    profiles,
    uniqueAddress: Array.from(new Set(addressList)),
  };
}
