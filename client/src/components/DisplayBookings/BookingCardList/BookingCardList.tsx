import { BookingRequest } from '../../../interface/BookingApiData';
import BookingCard from '../BookingCard/BookingCard';

interface Props {
  bookingList: BookingRequest[];
}

export default function BookingCardList(props: Props): JSX.Element {
  const { bookingList } = props;

  return (
    <>
      {bookingList.map((booking, index) => (
        <BookingCard key={index} booking={booking} />
      ))}
    </>
  );
}
