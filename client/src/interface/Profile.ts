import { User } from './User';
import * as Yup from 'yup';
export interface Profile {
  _id?: string;
  firstName: string;
  lastName: string;
  dob?: string;
  user?: User;
  profilePics?: string;
  gallaryPics?: string[];
  gender: Gender;
  phone: number;
  address: string;
  description: string;
  availability: [string];
  introduction?: string;
  pitch?: string;
  rate?: number;
}

export interface Profiles {
  Profiles?: Profiles[];
  error?: { message: string };
}
export interface ProfileCreated {
  profileData: Profile;
  profileId: string;
}
export interface ProfileCreateSuccess {
  error?: { message: string };
  profile?: ProfileCreated;
}
type Gender = 'male' | 'female';
