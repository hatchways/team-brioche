import { PaymentMethod } from '../../interface/PaymentMethods';
import { FetchOptions } from './../../interface/FetchOptions';

interface AddPaymentResponse {
  clientSecret: string;
  attachedDetails: {
    name: string;
    email: string;
  };
}
export const createCardSetup = async (): Promise<AddPaymentResponse> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const res = await fetch('/payments/add-payment-method', fetchOptions);

    if (res.status !== 200) {
      const { error } = await res.json();
      throw new Error(error.message);
    }

    return await res.json();
    // eslint-disable-next-line
  } catch (error: any) {
    throw new Error(error.message);
  }
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

  try {
    const res = await fetch('/payments/payment-methods', fetchOptions);
    if (res.status !== 200) {
      const { error } = await res.json();
      throw new Error(error.message);
    }
    return await res.json();
    // eslint-disable-next-line
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateDefaultMethod = async (methodId: string): Promise<void> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    const res = await fetch(`/set-default-method/${methodId}`, fetchOptions);
    if (res.status !== 200) {
      const { error } = await res.json();
      throw new Error(error.message);
    }
    // eslint-disable-next-line
  } catch (error: any) {
    throw new Error(error.message);
  }
};
