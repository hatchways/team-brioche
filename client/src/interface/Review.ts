import { Profile } from './Profile';

export type StarRating = 1 | 2 | 3 | 4 | 5;

export interface Review {
  _id: string;
  createdAt: string;
  request: string;
  reviewer: Profile;
  reviewee: Profile;
  starRating: StarRating;
  comment: string;
}

export interface CreateReview {
  reviewee: string;
  comment?: string;
  starRating?: StarRating;
}
