import { FetchOptions } from '../../interface/FetchOptions';
import { Conversation } from '../../interface/Conversation';
export async function getConversations(): Promise<Conversation[]> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/conversation`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
