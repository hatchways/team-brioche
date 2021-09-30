type Gender = 'male' | 'female' | 'non-binary' | 'prefer not to say';

export interface DayRange {
  dropInDate: string | undefined;
  dropOffDate: string | undefined;
}

type TimeRange = Array<{ startTime: string; endTime: string }>;

export interface Availability {
  dateRange: DayRange;
  weeklyTimeRange: TimeRange;
}

export interface Profile {
  _id?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  profilePic?: string;
  galleryPics?: string[];
  gender?: Gender;
  phone?: number;
  address: string;
  description?: string;
  availability?: Availability;
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
export interface ProfileCreateSuccess {
  error?: { message: string };
  profile?: ProfileCreated;
}
