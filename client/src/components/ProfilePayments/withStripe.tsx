import { FunctionComponent } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string);

export default function withStripe(Component: FunctionComponent): FunctionComponent {
  return function WithStripe(props) {
    return (
      <Elements stripe={promise}>
        <Component {...props} />
      </Elements>
    );
  };
}
