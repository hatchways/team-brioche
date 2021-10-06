import { PaymentMethod } from '../../interface/PaymentMethods';
import { FetchOptions } from './../../interface/FetchOptions';

interface AddPaymentResponse {
  clientSecret: string;
  attachedDetails: {
    name: string;
    email: string;
  };
}
export const addPaymentMethodToCustomer = async (): Promise<AddPaymentResponse> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };

  const res = await fetch('/payments/add-payment-method', fetchOptions);

  if (res.status !== 200) {
    throw new Error('An error occured while processing your request');
  }

  return await res.json();
};

interface GetPaymentMethodsResponse {
  PaymentMethods: PaymentMethod[];
  defaultPaymentMethod: string;
}

export const getAllPaymentMethodsByCustomer = async (): Promise<GetPaymentMethodsResponse> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  const res = await fetch('/payments/payment-methods', fetchOptions);
  if (res.status !== 200) {
    throw new Error();
  }
  return await res.json();
};

export const setDefaultPayment = async (methodId: string) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await fetch('/set-default-method/:methodId', fetchOptions);
  if (res.status !== 200) throw new Error('Unable to card as default');
};
