import { Profile } from '../interface/Profile';

const testProfile: Profile = {
  _id: '',
  firstName: 'Mike',
  lastName: 'Tyson',
  description: 'Description',
  availability: ['string1', 'string2'],
  profilePic: 'https://source.unsplash.com/random/100x100',
  dob: 'dob',
  gender: 'male',
  introduction: 'Loving pet sitter',
  pitch: 'I would love to work with your dog',
  address: 'Toronto Ontario',
  rate: 30,
  phone: [],
};

export default function getMock(): Array<Profile> {
  const sampleCount = 10;
  const mockProfileList = new Array<Profile>(sampleCount).fill(testProfile);
  let i = 0;
  return mockProfileList.map((profile) => {
    i++;
    const newProfile = { ...profile, _id: `${i}` };
    return newProfile;
  });
}
