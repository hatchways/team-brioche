import { FormikHelpers } from 'formik';

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  username: string;
  email: string;
  password: string;
}

export type HandleLogin = (login: Login, { setStatus, setSubmitting }: FormikHelpers<Login>) => void;
export type HandleRegister = (register: Register, { setStatus, setSubmitting }: FormikHelpers<Register>) => void;
