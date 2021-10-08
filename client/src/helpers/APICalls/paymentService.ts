import { PaymentMethod } from '../../interface/PaymentMethods';

interface AddPaymentResponse {
  clientSecret: string;
  attachedDetails: {
    name: string;
    email: string;
  };
}
export const createCardSetup = async (): Promise<AddPaymentResponse> => {
  // TODO: Add logic to call server endpoint
  return { clientSecret: '', attachedDetails: { name: '', email: '' } };
};

interface GetPaymentMethodsResponse {
  paymentMethods: PaymentMethod[];
  defaultPaymentMethod: string;
}
export const getAllPaymentMethodsByCustomer = async (): Promise<GetPaymentMethodsResponse> => {
  // TODO: Add logic to call server endpoint
  return { paymentMethods: [], defaultPaymentMethod: '' };
};

export const updateDefaultMethod = async (methodId: string): Promise<void> => {
  // TODO: Add logic to call server endpoint
};
