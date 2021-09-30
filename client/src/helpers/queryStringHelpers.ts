import queryString from 'query-string';
import { isValidDateString } from './dateTimeHelper';

const maxLengthPermitted = 20;
interface Query {
  address: { test: boolean; value: string };
  dropInDate: { test: boolean; value: string };
  dropOffDate: { test: boolean; value: string };
}

export const verfyProfileQuery = (queryString: queryString.ParsedQuery<string>): Query => ({
  address: {
    test: queryString && queryString.address && queryString.address.length < maxLengthPermitted ? true : false,
    value: queryString.address as string,
  },
  dropInDate: {
    test: queryString && queryString.dropInDate && isValidDateString(queryString.dropInDate as string) ? true : false,
    value: new Date(queryString.dropInDate as string).toString(),
  },
  dropOffDate: {
    test: queryString && queryString.dropOffDate && isValidDateString(queryString.dropOffDate as string) ? true : false,
    value: new Date(queryString.dropOffDate as string).toString(),
  },
});
