import { FetchOptions } from '../../interface/FetchOptions';
import { SendRequest, RequestSuccess } from '../../interface/BookingApiData';
export async function sendRequest({ id, start, end }: SendRequest): Promise<RequestSuccess> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      profileId: id,
      start,
      end,
    }),
    credentials: 'include',
  };
  return await fetch(`/request`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
