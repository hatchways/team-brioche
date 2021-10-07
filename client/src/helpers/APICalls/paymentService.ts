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
    const { error } = await res.json();
    throw new Error(error.message);
  }

  return await res.json();
};

interface GetPaymentMethodsResponse {
  paymentMethods: PaymentMethod[];
  defaultPaymentMethod: string;
}

export const getAllPaymentMethodsByCustomer = async (): Promise<GetPaymentMethodsResponse> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  const res = await fetch('/payments/payment-methods', fetchOptions);
  if (res.status !== 200) {
    const { error } = await res.json();
    throw new Error(error.message);
  }
  return await res.json();
};

export const updateDefaultMethod = async (methodId: string): Promise<void> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await fetch('/set-default-method/:methodId', fetchOptions);
  if (res.status !== 200) {
    const { error } = await res.json();
    throw new Error(error.message);
  }
};
