import getMock from '../../mocks/mockProfile';
import { Profile } from '../../interface/Profile';
import { DayRange } from './../../interface/Profile';

interface ProfileResponse {
  profiles: Profile[];
  uniqueAddress: string[];
}
// eslint-disable-next-line
export async function getList(address: string | undefined, range: DayRange): Promise<ProfileResponse> {
  const mockProfiles = getMock().filter((profile) => {
    if (address) return profile.address.includes(address);
    return true;
  });
  return await Promise.resolve({
    profiles: mockProfiles,
    uniqueAddress: getUniqueAddress(mockProfiles),
  });
}

// The returned list of unique addresses is used to populate a combo box for a more directed search
function getUniqueAddress(profiles: Profile[]): string[] {
  const addressList = profiles.map((profile) => profile.address);
  const uniqueAddress = new Set(addressList);
  return Array.from(uniqueAddress);
}
