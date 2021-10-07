import { Message } from './Message';
import { Profile } from './Profile';
export interface Conversation {
  _id: string;
  members?: Profile[];
  lastMessage?: Message;
  prevState?: null;
}
export interface ConversationList {
  coversations: Conversation[];
  prevState: null;
}
