import getMock from '../../mocks/mockProfile';
import { Profile } from '../../interface/Profile';
import { DayRange } from './../../interface/Profile';

interface ProfileResponse {
  profiles: Profile[];
  uniqueAddress: string[];
}

// eslint-disable-next-line
export async function getList(addressQuery: string | undefined, range: DayRange): Promise<ProfileResponse> {
  const mockProfiles = getMock().filter((profile) => {
    // if (addressQuery) return profile.address.toLowerCase().includes(addressQuery.toLowerCase());
    // return true;
  });
  return await Promise.resolve({
    profiles: mockProfiles,
    uniqueAddress: getUniqueAddress(mockProfiles),
  });
}

function getUniqueAddress(profiles: Profile[]): any {
  const addressList = profiles.map((profile) => profile.address);
  const uniqueAddress = new Set(addressList);
  //return Array.from(uniqueAddress);
}
