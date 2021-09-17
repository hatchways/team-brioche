import { BookingRequest } from '../interface/BookingApiData';

export const upcoming: BookingRequest = {
  accepted: false,
  declined: false,
  paid: false,
  dogOwner: {
    username: 'dogowner1',
    email: 'dogowner1@g.com',
  },
  dogSitter: {
    username: 'dogsitter1',
    email: 'dogsitter1@g.com',
  },
  start: new Date(),
  end: new Date(),
};

export const bookings = [
  {
    // past booking that was accepted
    accepted: true,
    declined: false,
    paid: true,
    dogOwner: {
      username: 'dogowner1',
      email: 'dogowner1@g.com',
    },
    dogSitter: {
      username: 'dogsitter5',
      email: 'dogsitter1@g.com',
    },
    start: new Date('2021 sept 12 8:30 PM'),
    end: new Date('2021 sept 12 10:30 PM'),
  },
  {
    // past booking was declined
    accepted: false,
    declined: true,
    paid: false,
    dogOwner: {
      username: 'dogowner11',
      email: 'dogowner11@g.com',
    },
    dogSitter: {
      username: 'dogsitter5',
      email: 'dogsitter1@g.com',
    },
    start: new Date('2021 sept 13 11:00 AM'),
    end: new Date('2021 sept 13 3:00 PM'),
  },
  {
    // upcoming booking that has been accepted
    accepted: true,
    declined: false,
    paid: false,
    dogOwner: {
      username: 'dogowner2',
      email: 'dogowner2@g.com',
    },
    dogSitter: {
      username: 'dogsitter5',
      email: 'dogsitter1@g.com',
    },
    start: new Date('2021 sept 23 10:30 PM'),
    end: new Date('2021 sept 23 8:30 PM'),
  },
  {
    // upcoming booking that has not been accepted
    accepted: false,
    declined: false,
    paid: false,
    dogOwner: {
      username: 'dogowner3',
      email: 'dogowner3@g.com',
    },
    dogSitter: {
      username: 'dogsitter5',
      email: 'dogsitter1@g.com',
    },
    start: new Date('2021 sept 22 8:30 AM'),
    end: new Date('2021 sept 22 11:30 PM'),
  },
  {
    // upcoming booking that has not been accepted
    accepted: false,
    declined: false,
    paid: false,
    dogOwner: {
      username: 'dogowner4',
      email: 'dogowner4@g.com',
    },
    dogSitter: {
      username: 'dogsitter5',
      email: 'dogsitter1@g.com',
    },
    start: new Date('2021 sept 25 8:30 AM'),
    end: new Date('2021 sept 25 11:30 PM'),
  },
  {
    // upcoming booking that has been declined
    accepted: false,
    declined: true,
    paid: false,
    dogOwner: {
      username: 'dogowner6',
      email: 'dogowner6@g.com',
    },
    dogSitter: {
      username: 'dogsitter5',
      email: 'dogsitter1@g.com',
    },
    start: new Date('2021 sept 25 8:30 AM'),
    end: new Date('2021 sept 25 11:30 PM'),
  },
];
