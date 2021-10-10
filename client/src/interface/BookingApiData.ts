import { User } from './User';

export interface BookingApiData {
  upcoming: BookingRequest | undefined | null;
  current: Array<BookingRequest>;
  past: Array<BookingRequest>;
}
export interface RequestSuccess {
  message: string;
  request: BookingRequest;
}
export interface SendRequest {
  id: string;
  start: string | null | undefined;
  end: string | null | undefined;
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
