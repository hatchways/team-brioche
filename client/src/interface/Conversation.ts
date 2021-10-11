import { Message } from './Message';
import { Profile } from './Profile';
export interface Conversation {
  members: Profile[];
  lastMessage: Message;
  _id: string;
}
export interface ConversationList {
  coversations: Conversation[] | Conversation;
}
