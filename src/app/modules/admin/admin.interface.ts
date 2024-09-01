import { Types } from 'mongoose';

export type TAdmin = {
  id: string;
  name: string;
  phone: string;
  user: Types.ObjectId;
  image: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  isDeleted: boolean;
};
