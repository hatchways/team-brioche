import { Profile, ProfileCreated } from '../interface/Profile';

const mockProfile: Profile = {
  firstName: 'Abc',
  lastName: 'Jkl',
  gender: 'male',
  phone: 1234567890,
  address: 'Some address',
  description: 'Somethinh',
  availability: [''],
};
const mockProfileCreated: ProfileCreated = {
  profileData: mockProfile,
  profileId: '123123',
};

export { mockProfile, mockProfileCreated };
