import { Profile ProfileCreated} from '../interface/Profile';

const testProfile1: Profile = {
  _id: '',
  firstName: 'Norma',
  lastName: 'Byers',
  description: 'Description',
  profilePic: 'https://source.unsplash.com/random/100x100',
  dob: 'dob',
  gender: 'male',
  introduction: 'Loving pet sitter',
  pitch: 'I would love to work with your dog',
  address: 'Toronto Ontario',
  rate: 10,
};
const testProfile2: Profile = {
  _id: '',
  firstName: 'Mike',
  lastName: 'Tyson',
  description: 'Description',
  profilePic: 'https://source.unsplash.com/random/100x100',
  dob: 'dob',
  gender: 'male',
  introduction: 'professional dog trainer',
  pitch:
    'This is here to test what happens with a really long string, This is here to test what happens with a really long stringThis is here to test what happens with a really long string',
  address: 'Brandon Manitoba',
  rate: 30,
};

const testProfile3: Profile = {
  _id: '',
  firstName: 'Micheal',
  lastName: 'Carnahan',
  description: 'Description',
  profilePic: 'https://source.unsplash.com/random/100x100',
  dob: 'dob',
  gender: 'male',
  introduction: 'Loving pet sitter',
  pitch: 'I Have had dogs as pets for most of my life',
  address: 'Alma Quebec',
  rate: 15,
};

export default function getMock(): Array<Profile> {
  const sampleCount = 10;
  const mockProfileList1 = new Array<Profile>(sampleCount).fill(testProfile1);
  const mockProfileList2 = new Array<Profile>(sampleCount).fill(testProfile2);
  const mockProfileList3 = new Array<Profile>(sampleCount).fill(testProfile3);
  const mockProfileList = [...mockProfileList1, ...mockProfileList2, ...mockProfileList3];
  let i = 0;
  return mockProfileList.map((profile) => {
    i++;
    const newProfile = { ...profile, _id: `${i}` };
    return newProfile;
  });
}

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
