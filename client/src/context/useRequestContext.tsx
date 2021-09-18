import { useEffect, useState, createContext, FunctionComponent, useContext } from 'react';
import { getBookings, updateBooking } from '../helpers/APICalls/bookingService';
import { BookingApiData } from '../interface/BookingApiData';
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
      await updateBooking(value, _id);
      const result = await getBookings();
      setBookings(result);
    } catch (error) {
      updateSnackBarMessage('An error occured');
    }
  };

  useEffect(() => {
    console.log('rerender');
    try {
      getBookings().then((result) => {
        setBookings(result);
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
