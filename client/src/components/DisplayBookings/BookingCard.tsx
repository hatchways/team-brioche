import React from 'react';
import { BookingRequest } from '../../interface/BookingApiData';
interface Props {
  current: BookingRequest[];
}
export function BookingCard(props: Props): JSX.Element {
  const { current } = props;
  return (
    <>
      {current.map((booking, index) => (
        <p key={index}>
          name of dogOwner: {booking.dogOwner.username} name of sitter: {booking.dogSitter.username}
        </p>
      ))}
    </>
  );
}
