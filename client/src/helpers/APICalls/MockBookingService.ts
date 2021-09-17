import { BookingApiData, BookingRequest } from '../../interface/BookingApiData';
import { current, past, upcoming, bookings } from '../../mocks/mockBookings';

export const getBookings = (): Promise<BookingApiData> => {
  return Promise.resolve(getMockBookings());
};

const getMockBookings = (): BookingApiData => {
  // sort bookings by date from newest to oldest
  bookings.sort((bookingA, bookingB) => bookingB.start.getTime() - bookingA.start.getTime());

  bookings.forEach((booking) => console.log('all', booking.start.toDateString()));

  const current = bookings.filter((booking) => {
    const today = Date.now();
    if (booking.start.getTime() > today) return true;
    return false;
  });

  current.forEach((booking) => console.log('upcoming', booking.start.toDateString()));

  return {
    upcoming,
    current,
    past,
  };
};
