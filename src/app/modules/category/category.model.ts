import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>({
  name: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

// query middleware show only where isDelete false
categorySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// query middlware for findone
categorySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// aggregate middleware
categorySchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

export const Category = model<TCategory>('Category', categorySchema);
