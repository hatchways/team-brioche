import { BookingApiData, BookingRequest } from '../../interface/BookingApiData';
import { bookings } from '../../mocks/mockBookings';

export const getBookings = (): Promise<BookingApiData> => {
  return Promise.resolve(getMockBookings());
};

/**
 * upcoming: The closes request to current date that has been accepted
 * current: All requests with start dates ahead of today - All future requests
 * past: All requests with start dates behind today - All past requests
 */
const getMockBookings = (): BookingApiData => {
  // sort bookings from Newest to oldest
  bookings.sort((bookingA, bookingB) => bookingB.start.getTime() - bookingA.start.getTime());

  const today = Date.now();
  const past: BookingRequest[] = [];
  let idx = -1;

  const current = bookings.filter((booking, index) => {
    if (booking.start.getTime() > today) {
      // get the index of the booking closest to the current date that has been accepted
      idx = index;
      return true;
    }
    past.push(booking);
    return false;
  });

  const upcoming = bookings[idx];
  if (idx >= 0) current.splice(idx, 1);

  return {
    upcoming,
    current,
    past,
  };
};
