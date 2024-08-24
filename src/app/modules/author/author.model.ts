import { model, Schema } from 'mongoose';
import { TAuthor } from './author.interface';

// Define name schema
const nameSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
});

const defaultImg = 'https://i.ibb.co/WGCzqdW/vecteezy-3d-icon-of-profile-privacy-24514477.png';

// Define the Vieser schema
const authorSchema = new Schema<TAuthor>(
  {
    name: { type: nameSchema, required: true },
    image: { type: String, required: true, default: defaultImg },
    email: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// Virtual property to get the full name
authorSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName || ''} ${this.name.lastName}`.trim();
});

// Middleware to only find documents where isDeleted is false
authorSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

authorSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Middleware for aggregate queries to filter out deleted documents
authorSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Static method to check if a user exists
authorSchema.statics.isUserExist = async function (id: string) {
  const existUser = await this.findOne({ _id: id });
  return existUser;
};

// Model for the TAuthor schema
export const Author = model<TAuthor>('Author', authorSchema);
