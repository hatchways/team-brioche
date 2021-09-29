import queryString from 'query-string';
import { isValidDateString } from './dateTimeHelper';

const maxLengthPermitted = 20;
interface Query {
  addressTest: boolean;
  startDateTest: boolean;
  endDateTest: boolean;
}

export const verfyProfileQuery = (query: queryString.ParsedQuery<string>): Query => ({
  addressTest: query && query.address && query.address.length < maxLengthPermitted ? true : false,
  startDateTest: query && query.startDate && isValidDateString(query.startDate as string) ? true : false,
  endDateTest: query && query.endDate && isValidDateString(query.endDate as string) ? true : false,
});
