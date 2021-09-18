import { User } from './User';

export interface BookingApiData {
  upcoming: BookingRequest | undefined | null;
  current: Array<BookingRequest>;
  past: Array<BookingRequest>;
}

export interface BookingRequest {
  _id: string;
  accepted: Boolean;
  declined: Boolean;
  paid: Boolean;
  ownerId: User;
  sitterId: User;
  start: string;
  end: string;
}
