/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  id: string;
  email: string;
  password: string;
  image: string;
  role: 'admin' | 'viewer' | 'author';
  needPasswordChange: boolean;
  passwordChangedAt?: Date;
  status: 'in-progress' | 'blocked';
  dateOfBirth: string;
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

export type TUserRole = keyof typeof USER_ROLE;
