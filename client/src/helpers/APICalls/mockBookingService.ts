import { Modify } from '../../context/useRequestContext';
import { BookingApiData, BookingRequest } from '../../interface/BookingApiData';
import { bookings } from '../../mocks/mockBookings';

export const getBookings = (): Promise<BookingApiData> => {
  return Promise.resolve(getMockBookings());
};

export const updateBooking = async (value: Modify, _id: string): Promise<BookingRequest> => {
  const booking = bookings.find((booking) => booking._id === _id) as BookingRequest;
  switch (value) {
    case 'Accept':
      booking.accepted = true;
      booking.declined = false;
      break;
    case 'Decline':
      booking.declined = true;
      booking.accepted = false;
      break;
    default:
      break;
  }
  return Promise.resolve(booking);
};

/**
 * upcoming: The closes request to current date that has been accepted
 * current: All requests with start dates ahead of current date
 * past: All requests with start dates behind current date
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
