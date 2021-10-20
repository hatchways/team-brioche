import { BookingStatusType } from '../../context/useRequestContext';
import { BookingApiData, BookingRequest } from '../../interface/BookingApiData';
import { FetchOptions } from '../../interface/FetchOptions';

interface UpdateBooking {
  accepted?: boolean;
  declined?: boolean;
}

interface CreateBooking {
  dropInDate: string;
  pickUpDate: string;
  sitterProfileId: string;
  ownerProfileId: string;
}

export const getBookings = async (): Promise<Array<BookingRequest>> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  const res = await fetch('/request', fetchOptions);
  if (res.status !== 200) {
    handleError(res);
    throw new Error();
  }
  return await res.json();
};

export const updateBooking = async (value: BookingStatusType, id: string): Promise<BookingRequest> => {
  const body: UpdateBooking = {};

  if (value === 'Accept') body.accepted = true;
  if (value === 'Decline') body.declined = true;

  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  };
  const res = await fetch(`/request/${id}`, fetchOptions);
  if (res.status !== 200) {
    handleError(res);
    throw new Error();
  }
  return await res.json();
};

export const createBooking = async (body: CreateBooking): Promise<BookingRequest> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  };
  try {
    const res = await fetch(`/request`, fetchOptions);
    const data = await res.json();
    if (res.status !== 200) {
      const { error } = data;
      throw new Error(error.message);
    }
    return data;
    // eslint-disable-next-line
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export function sortBookings(bookings: Array<BookingRequest>): BookingApiData {
  // sort bookings from Newest to oldest
  bookings.sort((bookingA, bookingB) => {
    const startA = new Date(bookingA.start);
    const startB = new Date(bookingB.start);
    return startB.getTime() - startA.getTime();
  });

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime();
  const past: BookingRequest[] = [];

  const current = bookings.filter((booking) => {
    const start = new Date(booking.start);
    if (start.getTime() > today) return true;
    past.push(booking);
    return false;
  });

  const upcomingIdx = current.length - 1;
  const upcoming = current[upcomingIdx];
  current.splice(upcomingIdx, 1);
  return {
    upcoming,
    current,
    past,
  };
}

function handleError(res: Response) {
  // get error message returned from server if any and log it
  res.json().then((error) => console.log(error));
}
