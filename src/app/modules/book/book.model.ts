import { Schema, model } from 'mongoose';
import { TBook } from './book.interface';

const bookSchema = new Schema<TBook>({
  name: { type: String, required: true },
  authorName: { type: String, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  quantity: { type: Number, required: true },
  shortDescription: { type: String, required: true },
  rating: { type: String, required: true },
  image: { type: String, required: true },
  borrowedCount: { type: Number, required: true, default: 0 },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isDeleted: { type: Boolean, default: false },
});

// query middleware show only where isDelete false
bookSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// query middlware for findone
bookSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// aggregate middleware
bookSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

export const Book = model<TBook>('Book', bookSchema);
