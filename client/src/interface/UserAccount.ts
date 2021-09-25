import { FormikHelpers } from 'formik';

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export type HandleLogin = (login: LoginInput, { setStatus, setSubmitting }: FormikHelpers<LoginInput>) => void;
export type HandleRegister = (
  register: RegisterInput,
  { setStatus, setSubmitting }: FormikHelpers<RegisterInput>,
) => void;
