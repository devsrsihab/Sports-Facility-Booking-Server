import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { USER_STATUS } from './user.constant';

const defaultImg = 'https://i.ibb.co/WGCzqdW/vecteezy-3d-icon-of-profile-privacy-24514477.png';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: { type: String, required: true, default: defaultImg },
    password: {
      type: String,
      required: true,
      select: 0,
    },

    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'], //'male' | 'female' | 'other'
        message: "{VALUE} is not valid. Allowed values are 'male', 'female', or 'other'",
      },
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: "{VALUE} is not valid. Allowed values are 'admin', 'viewer', or 'author'",
      },
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: USER_STATUS,
        message: "{VALUE} is not valid. Allowed values are 'in-progress' or 'blocked'",
      },
      default: 'in-progress',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// pre middleware / hook: we will work ot it create() save()
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  //hasing password
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  // next step
  next();
});
// post middleware / hook: we will work ot it create() save()
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// user exist cusotm static method
userSchema.statics.isUserExistByCustomIdOrEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};
// user exist cusotm static method
userSchema.statics.isPasswordMatch = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
// check is the jwt token issued before password changed
userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
  passwordChangedTimeStamp: Date,
  jwtIssuedTimeStamp: number,
) {
  const passwordChangedTime = Math.round(new Date(passwordChangedTimeStamp).getTime() / 1000);
  return passwordChangedTime > jwtIssuedTimeStamp;
};

// make model
export const User = model<TUser, UserModel>('User', userSchema);
