import { Profile } from './Profile';
export interface Message {
  read?: boolean;
  _id?: string;
  senderId?: Profile;
  message?: string;
  conversationId?: string;
  createdAt?: string;
  updatedAt?: string;
  __v: 0;
}

export interface MessageSent {
  messageSent?: any;
}
