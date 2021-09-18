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

  const displayTime = (date: Date) => {
    let AM = true;
    let hours = date.getHours();
    if (hours > 12) {
      hours = hours - 12;
      AM = false;
    }
    if (hours === 12) AM = false;
    const hourString = hours < 10 ? '0' + hours : hours;
    const ampm = AM ? 'AM' : 'PM';
    return `${hourString}${ampm}`;
  };

  const day = start.getDate();
  const month = Month[start.getMonth()];
  const year = start.getFullYear();

  return `${day} ${month} ${year}, ${displayTime(start)} - ${displayTime(end)}`;
};
