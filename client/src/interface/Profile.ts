export interface Profile {
  firstName: string;
  lastName: string;
  gender: string;
  phone: number;
  address: string;
  description: string;
  availability: [string];
}
export interface Profiles {
  Profiles?: Profiles[];
  error?: { message: string };
}
