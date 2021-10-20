import { Profile } from '../interface/Profile';

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
  phone: '0',
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
  pitch: 'This is here to test what happens with a really long string',
  address: 'Brandon Manitoba',
  rate: 30,
  phone: '0',
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
  phone: '0',
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
  firstName: 'Norma',
  lastName: 'Byers',
  gender: 'female',
  phone: '1234567890',
  introduction: 'Loving Pet Sitter',
  address: 'Toronto',
  description:
    ' Lorem ipsum dolor sit amet consectetur adipisicing elit. eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum.',
  _id: '',
  dob: '',
  profilePic: '/pics/profilepic-sample.jpg',
  coverPic: '/pics/cover-sample.jpg',
  galleryPics: ['/pics/dog1.jpg', '/pics/dog2.jpg', '/pics/dog3.jpg'],
  pitch: 'Loving Pet Sitter, Excellent Dog Trainer',
  rate: 0,
};

export { mockProfile };
