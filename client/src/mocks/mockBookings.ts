import { BookingRequest } from '../interface/BookingApiData';

export const upcoming: Array<BookingRequest> = [
  {
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
  },
  {
    accepted: true,
    declined: false,
    paid: false,
    dogOwner: {
      username: 'dogowner2',
      email: 'dogowner2@g.com',
    },
    dogSitter: {
      username: 'dogsitter1',
      email: 'dogsitter1@g.com',
    },
    start: new Date(),
    end: new Date(),
  },
];

export const current: Array<BookingRequest> = [
  {
    accepted: false,
    declined: false,
    paid: false,
    dogOwner: {
      username: 'dogowner3',
      email: 'dogowner3@g.com',
    },
    dogSitter: {
      username: 'dogsitter3',
      email: 'dogsitter3@g.com',
    },
    start: new Date(),
    end: new Date(),
  },
  {
    accepted: true,
    declined: false,
    paid: false,
    dogOwner: {
      username: 'dogowner4',
      email: 'dogowner2@g.com',
    },
    dogSitter: {
      username: 'dogsitter4',
      email: 'dogsitter1@g.com',
    },
    start: new Date(),
    end: new Date(),
  },
];

export const past: Array<BookingRequest> = [
  {
    accepted: false,
    declined: false,
    paid: false,
    dogOwner: {
      username: 'dogowner5',
      email: 'dogowner1@g.com',
    },
    dogSitter: {
      username: 'dogsitter5',
      email: 'dogsitter1@g.com',
    },
    start: new Date(),
    end: new Date(),
  },
  {
    accepted: true,
    declined: false,
    paid: false,
    dogOwner: {
      username: 'dogowner6',
      email: 'dogowner2@g.com',
    },
    dogSitter: {
      username: 'dogsitter6',
      email: 'dogsitter1@g.com',
    },
    start: new Date(),
    end: new Date(),
  },
];
