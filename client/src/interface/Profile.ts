import { User } from './User';
export interface Profile {
  _id?: string;
  firstName: string;
  lastName: string;
  dob?: string;
  user?: User;
  profilePic?: string;
  galleryPics?: string[];
  gender: Gender;
  phone: number;
  address: string;
  description: string;
  availability: [string];
  coverPic?: string;
  introduction?: string;
  pitch?: string;
  rate?: number;
}

export interface Profiles {
  Profiles?: Profiles[];
  error?: { message: string };
}
export interface ProfileCreated {
  profileData?: Profile;
  profileId?: string | '';
}
type Gender = 'male' | 'female' | 'non-binary' | 'prefer not to say';

interface Availability {
  dateRange: { startDate: string; endDate: string };
  weeklyTimeRange: Array<{ startTime: string; endTime: string }>;
}
export interface ProfileCreateSuccess {
  error?: { message: string };
  profile?: ProfileCreated;
}
