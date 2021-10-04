import { ParseableDate } from '@mui/lab/internal/pickers/constants/prop-types';
import { ParsedQuery } from 'query-string';
import { isValidDateString } from './dateTimeHelper';

const maxStringLength = 20;

interface ProfileQuery {
  address: { test: boolean; value: string };
  dropInDate: { test: boolean; value: string };
  dropOffDate: { test: boolean; value: string };
}

const recoverWhiteSpace = (str: string): string => str.split('-').join(' ');

export const verfyProfileQuery = (queryString: ParsedQuery<string>): ProfileQuery => ({
  address: {
    test: queryString.address && queryString.address.length < maxLengthPermitted ? true : false,
    value: queryString.address ? recoverWhiteSpace(queryString.address as string) : '',
  },
  dropInDate: {
    test: queryString.dropInDate && isValidDateString(queryString.dropInDate as string) ? true : false,
    value: new Date(queryString.dropInDate as string).toString(),
  },
  dropOffDate: {
    test: queryString.dropOffDate && isValidDateString(queryString.dropOffDate as string) ? true : false,
    value: new Date(queryString.dropOffDate as string).toString(),
  },
});

interface GenerateProfileQuery {
  address: string;
  dropInDate: ParseableDate<undefined>;
  dropOffDate: ParseableDate<undefined>;
}

const removeWhiteSpace = (str: string): string => str.trim().split(' ').join('-');

export const generateQueryString = (value: GenerateProfileQuery): string => {
  const { address, dropInDate, dropOffDate } = value;

  let search = '';
  let addAmpersand = false;
  if (address) {
    search += `address=${removeWhiteSpace(address)}`;
    addAmpersand = true;
  }
  if (dropInDate) {
    const text = `dropInDate=${removeWhiteSpace(dropInDate.toLocaleString())}`;
    search += addAmpersand ? `&${text}` : `${text}`;
    addAmpersand = true;
  }
  if (dropOffDate) {
    const text = `dropOffDate=${removeWhiteSpace(dropOffDate.toLocaleString())}`;
    search += addAmpersand ? `&${text}` : `${text}`;
  }
  return search;
};
