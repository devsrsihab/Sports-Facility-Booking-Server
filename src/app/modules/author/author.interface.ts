import { Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TAuthor = {
  id: string;
  name: TUserName;
  user: Types.ObjectId;
  image: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  role: string;
  dateOfBirth: string;
  isDeleted: boolean;
};
