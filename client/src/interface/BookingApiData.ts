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
  ownerId: User;
  sitterId: User;
  start: string;
  end: string;
}
