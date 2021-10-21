import { FetchOptions } from '../../interface/FetchOptions';
import { Review, CreateReview } from '../../interface/Review';

export const getReviews = async (profileId: string): Promise<Review[]> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  try {
    const res = await fetch(`/reviews/${profileId}`, fetchOptions);
    const data = await res.json();
    if (res.status !== 200) throw new Error(data.error.message);
    return data;
    // eslint-disable-next-line
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createUpdateReviews = async (review: CreateReview, requestId: string): Promise<Review> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(review),
  };

  try {
    const res = await fetch(`reviews/${requestId}`, fetchOptions);
    const data = await res.json();
    if (res.status !== 200) throw new Error(data.error.message);
    return data;
    // eslint-disable-next-line
  } catch (error: any) {
    throw new Error(error.message);
  }
};
