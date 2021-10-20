import { Profile } from './Profile';
import { User } from './User';

export interface BookingApiData {
  upcoming: BookingRequest | undefined | null;
  current: Array<BookingRequest>;
  past: Array<BookingRequest>;
}

export interface BookingRequest {
  _id: string;
  accepted: boolean;
  declined: boolean;
  paid: boolean;
  ownerId: Profile;
  sitterId: Profile;
  start: string;
  end: string;
  paymentIntentId?: string;
}
