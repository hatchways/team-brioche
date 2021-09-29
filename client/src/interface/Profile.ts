export interface Profile {
  _id?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  profilePic?: string;
  galleryPics?: string[];
  coverPic?: string;
  gender?: Gender;
  phone?: number;
  address?: string;
  description?: string;
  availability?: Availability;
  introduction?: string;
  pitch?: string;
  rate?: number;
  error?: string;
}

export interface Profiles {
  Profiles?: Profiles[];
  error?: { message: string };
}
export interface ProfileCreated {
  profileData?: Profile;
  profileId?: string | '';
}
export interface ProfileCreateSuccess {
  error?: { message: string };
  profile?: ProfileCreated;
}
type Gender = 'male' | 'female' | 'non-binary' | 'prefer not to say';

interface Availability {
  dateRange: { startDate: string; endDate: string };
  weeklyTimeRange: Array<{ startTime: string; endTime: string }>;
}
