import { BookingRequest } from '../interface/BookingApiData';

export const bookings: Array<BookingRequest> = [
  {
    // past booking that was accepted
    _id: '1',
    accepted: true,
    declined: false,
    paid: true,
    ownerId: {
      username: 'dogowner1',
      email: 'dogowner1@g.com',
    },
    sitterId: {
      username: 'dogsitter5',
      email: 'dogsitter1@g.com',
    },
    start: '2021 sept 12 8:00 PM',
    end: '2021 sept 12 10:00 PM',
  },
  {
    // past booking was declined
    _id: '2',
    accepted: false,
    declined: true,
    paid: false,
    ownerId: {
      username: 'dogowner11',
      email: 'dogowner11@g.com',
    },
    sitterId: {
      username: 'dogsitter5',
      email: 'dogsitter1@g.com',
    },
    start: '2021 sept 13 11:00 AM',
    end: '2021 sept 13 3:00 PM',
  },
  {
    // upcoming booking that has been accepted
    _id: '3',
    accepted: true,
    declined: false,
    paid: false,
    ownerId: {
      username: 'dogowner2',
      email: 'dogowner2@g.com',
    },
    sitterId: {
      username: 'dogsitter5',
      email: 'dogsitter1@g.com',
    },
    start: '2021 sept 23 4:00 PM',
    end: '2021 sept 23 10:00 PM',
  },
  {
    // upcoming booking that has not been accepted
    _id: '4',
    accepted: false,
    declined: false,
    paid: false,
    ownerId: {
      username: 'dogowner3',
      email: 'dogowner3@g.com',
    },
    sitterId: {
      username: 'dogsitter5',
      email: 'dogsitter1@g.com',
    },
    start: '2021 sept 22 8:00 AM',
    end: '2021 sept 22 11:00 PM',
  },
  {
    // upcoming booking that has not been accepted
    _id: '5',
    accepted: false,
    declined: false,
    paid: false,
    ownerId: {
      username: 'dogowner4',
      email: 'dogowner4@g.com',
    },
    sitterId: {
      username: 'dogsitter5',
      email: 'dogsitter1@g.com',
    },
    start: '2021 sept 25 8:00 AM',
    end: '2021 sept 25 11:00 PM',
  },
  {
    // upcoming booking that has been declined
    _id: '6',
    accepted: false,
    declined: true,
    paid: false,
    ownerId: {
      username: 'dogowner6',
      email: 'dogowner6@g.com',
    },
    sitterId: {
      username: 'dogsitter5',
      email: 'dogsitter1@g.com',
    },
    start: '2021 sept 25 8:00 AM',
    end: '2021 sept 25 11:00 PM',
  },
];
