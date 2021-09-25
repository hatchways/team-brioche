import { User } from './User';

type Gender = 'male' | 'female';

export interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  dob: string;
  user: User;
  profilePics: string;
  gallaryPics: string[];
  gender: Gender;
  phone: number;
  address: string;
  description: string;
  availability: string[];
  introduction: string;
  pitch: string;
  rate: number;
}
