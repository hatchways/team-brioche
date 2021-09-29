import { Profile, ProfileCreated } from '../interface/Profile';
import { mockLoggedInUser } from './mockUser';
const mockProfile: Profile = {
  firstName: 'Abc',
  lastName: 'Jkl',
  gender: 'male',
  phone: 123123123,
  address: 'Some address',
  description: 'Somethinh',
  _id: '',
  dob: '',
  profilePic: '',
  galleryPics: [],
  introduction: '',
  pitch: '',
  rate: 0,
};
const mockProfileCreated: ProfileCreated = {
  profileData: mockProfile,
  profileId: '123123',
};

export { mockProfile, mockProfileCreated };
