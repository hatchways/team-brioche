// prints the date text
export const displayDateTime = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const Month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const displayTime = (date: Date) => date.toLocaleString('en-us', { hour: 'numeric' });

  const day = start.getDate();
  const month = Month[start.getMonth()];
  const year = start.getFullYear();

  return `${day} ${month} ${year}, ${displayTime(start)} - ${displayTime(end)}`;
};

export const isValidDateString = (testString: string): boolean => Boolean(Date.parse(testString));
export const formatCardDate = (value: string | number): string => {
  const str = new String(value);
  if (str.length > 2) return str.slice(2);
  if (str.length === 1) return '0' + str;
  return str + '';
};
