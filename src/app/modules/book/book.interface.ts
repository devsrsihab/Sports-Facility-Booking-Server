import { Types } from 'mongoose';

export type TBook = {
  name: string;
  authorName: string;
  category: Types.ObjectId;
  quantity: number;
  shortDescription: string;
  rating: string;
  image: string;
  borrowedCount: number;
  createdBy: Types.ObjectId;
  isDeleted: boolean;
};
