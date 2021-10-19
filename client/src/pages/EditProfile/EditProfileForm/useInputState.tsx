import { useState } from 'react';

// eslint-disable-next-line
export default (initialVal: any) => {
  const [value, setValue] = useState(initialVal);
  // eslint-disable-next-line
  const handleChange = (e: { target: { value: any } }) => {
    setValue(e.target.value);
  };
  const reset = () => {
    setValue('');
  };
  return [value, handleChange, reset];
};
