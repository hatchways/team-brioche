import { BookingApiData } from '../../interface/BookingApiData';
import { current, past, upcoming } from '../../mocks/mockBookings';

export const getBookings = (): Promise<BookingApiData> => {
  return Promise.resolve({ upcoming: upcoming, current: current, past: past });
};
