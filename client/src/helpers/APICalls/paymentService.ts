import { PaymentMethod } from '../../interface/PaymentMethods';

interface AddPaymentResponse {
  clientSecret: string;
  attachedDetails: {
    name: string;
    email: string;
  };
}
export const createCardSetup = async (): Promise<AddPaymentResponse> => {
  // create setup intent
  return { clientSecret: '', attachedDetails: { name: '', email: '' } };
};

interface GetPaymentMethodsResponse {
  paymentMethods: PaymentMethod[];
  defaultPaymentMethod: string;
}
export const getAllPaymentMethodsByCustomer = async (): Promise<GetPaymentMethodsResponse> => {
  return { paymentMethods: [], defaultPaymentMethod: '' };
};

export const updateDefaultMethod = async (methodId: string): Promise<void> => {
  // No error means ok
};
