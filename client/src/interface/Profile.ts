type Gender = 'male' | 'female' | 'non-binary' | 'prefer not to say';

export interface DayRange {
  startDate: string | undefined;
  endDate: string | undefined;
}

type TimeRange = Array<{ startTime: string; endTime: string }>;

export interface Availability {
  dateRange: DayRange;
  weeklyTimeRange: TimeRange;
}

export interface Profile {
  _id: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  profilePic?: string;
  galleryPics?: string[];
  gender?: Gender;
  phone?: string;
  address: string;
  description?: string;
  availability?: Availability;
  introduction?: string;
  pitch?: string;
  rate?: number;
}
