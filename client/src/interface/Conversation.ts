import { Message } from './Message';
export interface Conversation {
  members: string[];
  lastMessage: Message;
}
export interface ConversationList {
  coversations: Conversation[];
}
