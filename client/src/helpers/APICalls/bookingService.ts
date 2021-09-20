import { BookingStatusType } from '../../context/useRequestContext';
import { BookingApiData, BookingRequest } from '../../interface/BookingApiData';
import { bookings } from '../../mocks/mockBookings';

export const getBookings = (): Promise<Array<BookingRequest>> => {
  return Promise.resolve(bookings);
};

export const updateBooking = async (value: BookingStatusType, _id: string): Promise<BookingRequest> => {
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
 * Current: All requests with start dates ahead of current date
 * Upcoming: The request in Current closest to the current date
 * Past: All requests with start dates behind current date
 */
export const sortBookings = (bookings: Array<BookingRequest>): BookingApiData => {
  // sort bookings from Newest to oldest
  bookings.sort((bookingA, bookingB) => {
    const startA = new Date(bookingA.start);
    const startB = new Date(bookingB.start);
    return startB.getTime() - startA.getTime();
  });

  const today = Date.now();
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
};
