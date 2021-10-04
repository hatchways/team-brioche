export interface User {
  email: string;
  username: string;
  profilePic: string;
  id?: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
