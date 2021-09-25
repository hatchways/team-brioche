import { Profile, ProfileCreated } from '../interface/Profile';
import { mockLoggedInUser } from './mockUser';
const mockProfile: Profile = {
  firstName: 'Abc',
  lastName: 'Jkl',
  gender: 'male',
  phone: 1234567890,
  address: 'Some address',
  description: 'Somethinh',
  availability: [''],
  _id: '',
  dob: '',
  user: mockLoggedInUser,
  profilePics: '',
  gallaryPics: [],
  introduction: '',
  pitch: '',
  rate: 0,
};
const mockProfileCreated: ProfileCreated = {
  profileData: mockProfile,
  profileId: '123123',
};

export { mockProfile, mockProfileCreated };
