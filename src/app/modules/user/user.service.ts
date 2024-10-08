/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatAdminId, generatUserId } from './user.utils';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

// create user
const createUserToDB = async (payload: TUser) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if the password empty
  userData.password = payload.password || (config.user_default_password as string);

  // set user role
  userData.role = 'user';
  // email
  userData.email = payload.email;
  // phone
  userData.phone = payload.phone;
  // name
  userData.name = payload.name;
  // image
  userData.image = payload.image;

  try {
    userData.id = await generatUserId();
    // create a user transaction 01
    const result = await User.create(userData);
    return result;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, `Failed to create user: ${error?.message}`);
  }
};

// create Admin
const createAdminToDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if the password empty
  userData.password = password || (config.user_default_password as string);
  // set user role
  userData.role = 'admin';
  // create admin email
  userData.email = payload.email;
  // create admin name
  userData.name = payload.name;
  // phone
  userData.phone = payload.phone;
  // image
  userData.image = payload.image;
  // start session
  const session = await mongoose.startSession();

  try {
    // start session
    session.startTransaction();

    userData.id = await generatAdminId();
    // create a user transaction 01
    const newUser = await User.create([userData], { session }); // transaction return array
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // set user id in viewer id field
    payload.id = newUser[0].id;

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (error: unknown) {
    await session.abortTransaction();
    await session.endSession();
    if (error instanceof Error) {
      throw new AppError(httpStatus.BAD_REQUEST, error.message);
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, 'Unknown error occurred');
    }
  }
};

// get me servcies
const getMeFromDB = async (email: string, role: string) => {
  let result = null;

  // if viewer
  if (role === 'user') {
    result = await User.findOne({ email });
  }

  // if admin
  if (role === 'admin') {
    result = await User.findOne({ email });
  }

  return result;
};

// change status
const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const UserServices = {
  createAdminToDB,
  createUserToDB,
  getMeFromDB,
  changeStatus,
};
