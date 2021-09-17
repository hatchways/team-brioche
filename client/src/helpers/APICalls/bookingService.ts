import { BookingRequest } from '../../interface/BookingApiData';
import { FetchOptions } from '../../interface/FetchOptions';
import { Modify } from './../../context/useRequestContext';

const requestEndpoint = 'http://localhost:3001/request';

interface UpdateBooking {
  accepted?: boolean;
  declined?: boolean;
}

export const getBookings = async (): Promise<Array<BookingRequest>> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(requestEndpoint, fetchOptions).then((res) => res.json());
};

export const updateBooking = async (value: Modify, _id: string) => {
  const body: UpdateBooking = {};

  if (value === 'Accept') body.accepted = true;
  if (value === 'Decline') body.declined = true;

  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(body),
  };
  return await fetch(requestEndpoint + _id, fetchOptions).then((res) => res.json());
};
