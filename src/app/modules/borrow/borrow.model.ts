import { Schema, model } from 'mongoose';
import { TBorrowing } from './borrow.interface';

const borrowingBookSchema = new Schema<TBorrowing>({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  borrowedDate: { type: String, required: true },
  returnDate: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

// query middleware show only where isDelete false
borrowingBookSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// query middlware for findone
borrowingBookSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// aggregate middleware
borrowingBookSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

export const Borrowing = model<TBorrowing>('Borrowing', borrowingBookSchema);
