import { model, Schema } from 'mongoose';
import { TAdmin } from './admin.interface';

// Define name schema
const nameSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
});

const defaultImg = 'https://i.ibb.co/WGCzqdW/vecteezy-3d-icon-of-profile-privacy-24514477.png';

// admin schema
const AdminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
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

// query middleware show only where isDelete false
AdminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// query middlware for findone show only where isDelete false
AdminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// aggregate middleware show only where isDelete false
AdminSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

// export admin model
export const Admin = model<TAdmin>('Admin', AdminSchema);
