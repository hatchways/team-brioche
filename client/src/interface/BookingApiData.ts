import { User } from './User';

export interface BookingApiData {
  upcoming: Array<BookingRequest>;
  current: Array<BookingRequest>;
  past: Array<BookingRequest>;
}

export interface BookingRequest {
  accepted: Boolean;
  declined: Boolean;
  paid: Boolean;
  dogOwner: User;
  dogSitter: User;
  start: Date;
  end: Date;
}
