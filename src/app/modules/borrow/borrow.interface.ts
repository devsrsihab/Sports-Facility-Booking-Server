import { Types } from "mongoose";

export type TBorrowing = {
  book: Types.ObjectId;
  user: Types.ObjectId;
  borrowedDate: string;
  returnDate: string;
  isDeleted: boolean;
};
