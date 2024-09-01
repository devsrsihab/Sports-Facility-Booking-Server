/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';
import { Types } from 'mongoose';

export interface TUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  image: string;
  role: 'admin' | 'user';
  status: 'in-progress' | 'blocked';
  gender?: 'male' | 'female' | 'other';
  bookings: Types.ObjectId[]; // Array of Booking ObjectIds
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistByCustomIdOrEmail(email: string): Promise<TUser>;
  isPasswordMatch(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}

// export type TUserRole = keyof typeof USER_ROLE;
export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
