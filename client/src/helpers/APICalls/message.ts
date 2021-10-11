import { FetchOptions } from '../../interface/FetchOptions';
import { Message, MessageSent } from '../../interface/Message';
export async function getMessages(convoId: string): Promise<Message[]> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/message/${convoId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function sendMessage(conversationId: string, message: string): Promise<MessageSent> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversationId, message }),
  };
  return await fetch(`/message`, fetchOptions)
    .then((res) => res.json())
    .catch(() => {
      error: {
        message: 'Unable to send the message. Please try again';
      }
    });
}
