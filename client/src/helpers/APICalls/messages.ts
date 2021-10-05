import { FetchOptions } from '../../interface/FetchOptions';
import { Message } from '../../interface/Message';

export async function getMessages(convoId: string): Promise<Message[]> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/message/${convoId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to get messages' } }));
}
interface ISendMessage {
  conversationId: string;
  message: string;
}
export async function sendMessage(conversationId: string | undefined, message: any): Promise<Message[]> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ conversationId, message }),
  };
  return await fetch(`/message/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({ error: { message: 'Unable to get messages' } }));
}
