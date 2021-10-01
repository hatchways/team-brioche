import { Profile, ProfileCreated } from '../interface/Profile';
import { mockLoggedInUser } from './mockUser';
const mockProfile: Profile = {
  firstName: 'Norma',
  lastName: 'Byers',
  gender: 'female',
  phone: 1234567890,
  introduction: 'Loving Pet Sitter',
  address: 'Toronto',
  description:
    ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum.',
  availability: [''],
  _id: '',
  dob: '',
  user: mockLoggedInUser,
  profilePic: '/pics/profilepic-sample.jpg',
  coverPic: '/pics/cover-sample.jpg',
  galleryPics: ['/pics/dog1.jpg', '/pics/dog2.jpg', '/pics/dog3.jpg'],
  pitch: 'Loving Pet Sitter, Excellent Dog Trainer',
  rate: 0,
};
const mockProfileCreated: ProfileCreated = {
  profileData: mockProfile,
  profileId: '123123',
};

export { mockProfile, mockProfileCreated };
