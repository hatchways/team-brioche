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

// cache the list of bookings for faster updates
let bookingList: Array<BookingRequest> = [];

export const RequestProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [bookings, setBookings] = useState<BookingApiData>({
    upcoming: null,
    current: [],
    past: [],
  });
  const [fetching, setFetching] = useState(true);
  const { updateSnackBarMessage } = useSnackBar();

  const modifyBooking: ModifyBooking = (value, _id) => {
    updateBooking(value, _id)
      .then((updatedBooking) => {
        const idx = bookingList.findIndex((b) => b._id === updatedBooking._id);
        bookingList[idx] = updatedBooking;
        setBookings(sortBookings(bookingList));
      })
      .catch(() => updateSnackBarMessage('An error occured while processing your Request'));
  };

  useEffect(() => {
    getBookings()
      .then((result) => {
        bookingList = result;
        setBookings(sortBookings(bookingList));
        setFetching(false);
      })
      .catch(() => updateSnackBarMessage('An error occured'));
  }, [updateSnackBarMessage]);
  return <RequestContext.Provider value={{ bookings, fetching, modifyBooking }}>{children}</RequestContext.Provider>;
};

export function useRequest(): ReqContext {
  return useContext(RequestContext);
}

export function withReqeust(Component: React.FunctionComponent): FunctionComponent {
  return function WithRequest(props) {
    return (
      <RequestProvider>
        <Component {...props} />
      </RequestProvider>
    );
  };
}
