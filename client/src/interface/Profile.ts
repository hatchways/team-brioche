type Gender = 'male' | 'female' | 'none binary' | 'prefer not to say';

export interface Profile {
  _id?: string;
  firstName: string;
  lastName: string;
  dob: string;
  profilePic: string;
  gallaryPics?: string[];
  gender: Gender;
  phone?: string;
  address: string;
  description: string;
  availability: string[];
  introduction: string;
  pitch: string;
  rate: number;
}
