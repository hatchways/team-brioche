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
 * Current: All requests with start dates ahead of current date
 * Upcoming: The request in Current closest to the current date
 * Past: All requests with start dates behind current date
 */
const getMockBookings = (): BookingApiData => {
  // sort bookings from Newest to oldest
  bookings.sort((bookingA, bookingB) => bookingB.start.getTime() - bookingA.start.getTime());

  const today = Date.now();
  const past: BookingRequest[] = [];

  const current = bookings.filter((booking) => {
    if (booking.start.getTime() > today) return true;
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
