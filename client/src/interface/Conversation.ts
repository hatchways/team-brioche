import { Message } from './Message';
import { User } from './User';
export interface Conversation {
  _id: string;
  members?: User[];
  lastMessage?: Message;
  prevState?: null;
}
export interface ConversationList {
  coversations: Conversation[];
  prevState: null;
}
