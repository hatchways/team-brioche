import { PaymentMethod } from '../../interface/PaymentMethods';

interface AddPaymentResponse {
  clientSecret: string;
  attachedDetails: {
    name: string;
    email: string;
  };
}
export const addPaymentMethodToCustomer = async (): Promise<AddPaymentResponse> => {
  // create setup intent
  return { clientSecret: '', attachedDetails: { name: '', email: '' } };
};

interface GetPaymentMethodsResponse {
  PaymentMethods: PaymentMethod[];
  defaultPaymentMethod: string;
}
export const getAllPaymentMethodsByCustomer = async (): Promise<GetPaymentMethodsResponse> => {
  return { PaymentMethods: [], defaultPaymentMethod: '' };
};

export const setDefaultPayment = async (methodId: string) => {
  // no error mean ok
};
