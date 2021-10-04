export interface ProfileResponse {
  _id?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  profilePic?: string;
  galleryPics?: string[];
  description?: string;
  availability?: string;
  gender?: string;
  phone?: string;
  address?: string;
}
