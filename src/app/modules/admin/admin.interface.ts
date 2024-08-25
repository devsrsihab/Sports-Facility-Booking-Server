import { Types } from 'mongoose';

// username
export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TAdmin = {
  id: string;
  name: string;
  user: Types.ObjectId;
  image: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  isDeleted: boolean;
};
