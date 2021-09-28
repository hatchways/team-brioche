type Gender = 'male' | 'female' | 'non-binary' | 'prefer not to say';

interface Availability {
  dateRange: { startDate: string; endDate: string };
  weeklyTimeRange: Array<{ startTime: string; endTime: string }>;
}

export interface Profile {
  _id?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  profilePic?: string;
  galleryPics?: string[];
  gender?: Gender;
  phone?: string;
  address?: string;
  description?: string;
  availability?: Availability;
  introduction?: string;
  pitch?: string;
  rate?: number;
}
