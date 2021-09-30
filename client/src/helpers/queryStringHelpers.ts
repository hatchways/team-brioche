import { ParseableDate } from '@mui/lab/internal/pickers/constants/prop-types';
import queryString from 'query-string';
import { isValidDateString } from './dateTimeHelper';

const maxLengthPermitted = 20;
interface Query {
  address: { test: boolean; value: string };
  dropInDate: { test: boolean; value: string };
  dropOffDate: { test: boolean; value: string };
}

// queryStrings use '-' to separate words i.e Toronto-Ontario => Toronto Ontario
const recoverWhiteSpace = (str: string): string => str.split('-').join(' ');

export const verfyProfileQuery = (queryString: queryString.ParsedQuery<string>): Query => ({
  address: {
    test: queryString && queryString.address && queryString.address.length < maxLengthPermitted ? true : false,
    value: recoverWhiteSpace(queryString.address as string),
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

interface GenerateQuery {
  address: string;
  dropInDate: ParseableDate<undefined>;
  dropOffDate: ParseableDate<undefined>;
}

const cleanUp = (str: string): string => str.trim().split(' ').join('-');

export const generateQueryString = (value: GenerateQuery): string => {
  const { address, dropInDate, dropOffDate } = value;

  let search = '';
  let addAmpersand = false;
  if (address) {
    search += `address=${cleanUp(address)}`;
    addAmpersand = true;
  }
  if (dropInDate) {
    const text = `dropInDate=${cleanUp(dropInDate.toLocaleString())}`;
    search += addAmpersand ? `&${text}` : `${text}`;
    addAmpersand = true;
  }
  if (dropOffDate) {
    const text = `dropOffDate=${cleanUp(dropOffDate.toLocaleString())}`;
    search += addAmpersand ? `&${text}` : `${text}`;
  }
  return search;
};