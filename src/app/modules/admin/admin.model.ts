import { model, Schema } from 'mongoose';
import { TAdmin } from './admin.interface';



const defaultImg = 'https://i.ibb.co/WGCzqdW/vecteezy-3d-icon-of-profile-privacy-24514477.png';

// admin schema
const AdminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    image: { type: String, required: true, default: defaultImg },
    email: { type: String, required: true, unique: true },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'], //'male' | 'female' | 'other'
        message: "{VALUE} is not valid. Allowed values are 'male', 'female', or 'other'",
      },
    },
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
