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
  dogOwner: User;
  dogSitter: User;
  start: Date;
  end: Date;
}
