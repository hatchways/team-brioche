import React from 'react';
import { RequestProvider } from '../context/useRequestContext';

export default function withReqeust(component: React.FunctionComponent): JSX.Element {
  return <RequestProvider>{component}</RequestProvider>;
}
