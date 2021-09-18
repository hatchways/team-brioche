import { useEffect, useState, createContext, FunctionComponent, useContext } from 'react';
import { getBookings, sortBookings, updateBooking } from '../helpers/APICalls/bookingService';
import { BookingApiData, BookingRequest } from '../interface/BookingApiData';
import { useSnackBar } from './useSnackbarContext';

export type Modify = 'Accept' | 'Decline';
type ModifyBooking = (value: Modify, _id: string) => void;

interface ReqContext {
  bookings: BookingApiData;
  fetching: boolean;
  modifyBooking: ModifyBooking;
}

const RequestContext = createContext<ReqContext>({
  bookings: {
    upcoming: null,
    current: [],
    past: [],
  },
  fetching: true,
  modifyBooking: () => null,
});

let bookingList: Array<BookingRequest> = [];

export const RequestProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [bookings, setBookings] = useState<BookingApiData>({
    upcoming: null,
    current: [],
    past: [],
  });
  const [fetching, setFetching] = useState(true);
  const { updateSnackBarMessage } = useSnackBar();

  const modifyBooking: ModifyBooking = async (value, _id) => {
    try {
      const booking = await updateBooking(value, _id);
      const idx = bookingList.findIndex((b) => b._id === booking._id);
      bookingList[idx] = booking;
      setBookings(sortBookings(bookingList));
    } catch (error) {
      updateSnackBarMessage('An error occured while processing your Request');
    }
  };

  useEffect(() => {
    try {
      getBookings().then((result) => {
        bookingList = result;
        setBookings(sortBookings(bookingList));
        setFetching(false);
      });
    } catch (error) {
      updateSnackBarMessage('An error occured');
    }
  }, [updateSnackBarMessage]);
  return <RequestContext.Provider value={{ bookings, fetching, modifyBooking }}>{children}</RequestContext.Provider>;
};

export function useRequest(): ReqContext {
  return useContext(RequestContext);
}
