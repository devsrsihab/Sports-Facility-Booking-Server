/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatAdminId, generatAuthorId, generatViewerId } from './user.utils';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { TViewer } from '../viewer/viewer.interface';
import { Viewer } from '../viewer/viewer.model';
import { TAuthor } from '../author/author.interface';
import { Author } from '../author/author.model';

// create viewer
const createViewerToDB = async (password: string, payload: TViewer) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if the password empty
  userData.password = password || (config.user_default_password as string);

  // set user role
  userData.role = 'viewer';
  // email
  userData.email = payload.email;
  // image
  userData.image = payload.image;
  // dateOfBirth
  userData.dateOfBirth = payload.dateOfBirth;
  // start session
  const session = await mongoose.startSession();

  try {
    // start session
    session.startTransaction();
    userData.id = await generatViewerId();

    // create a user transaction 01
    const newUser = await User.create([userData], { session });

    // if created the user successfully then create the viewer
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create viewer');
    }

    // set viewer user field data
    payload.id = newUser[0].id; // embating id
    payload.user = newUser[0]._id; // reference id
    const newViewer = await Viewer.create([payload], { session });
    if (!newViewer.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create viewer');
    }
    await session.commitTransaction();
    await session.endSession();

    return newViewer;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, `Failed to create viewer: ${error?.message}`);
  }
};

// create author
const createAuthorToDB = async (password: string, payload: TAuthor) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if the password empty
  userData.password = password || (config.user_default_password as string);

  // set user role
  userData.role = 'author';
  // email
  userData.email = payload.email;
  // image
  userData.image = payload.image;
  // dateOfBirth
  userData.dateOfBirth = payload.dateOfBirth;
  // start session
  const session = await mongoose.startSession();

  try {
    // start session
    session.startTransaction();
    userData.id = await generatAuthorId();

    // create a user transaction 01
    const newUser = await User.create([userData], { session });

    // if created the user successfully then create the viewer
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create author');
    }

    // set viewer user field data
    payload.id = newUser[0].id; // embating id
    payload.user = newUser[0]._id; // reference id
    const newViewer = await Author.create([payload], { session });
    if (!newViewer.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create author');
    }
    await session.commitTransaction();
    await session.endSession();

    return newViewer;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, `Failed to create author: ${error?.message}`);
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
  // image
  userData.image = payload.image;
  // dateOfBirth
  userData.dateOfBirth = payload.dateOfBirth;
  // start session
  const session = await mongoose.startSession();

  try {
    // start session
    session.startTransaction();

    userData.id = await generatAdminId();
    // create a user transaction 01
    const newUser = await User.create([userData], { session }); // transaction return array
    // if created the user successfully then create the user
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // set user id in viewer id field
    payload.id = newUser[0].id; // embating id

    // set viewer user field data
    payload.user = newUser[0]._id; // reference id
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
  if (role === 'viewer') {
    result = await User.findOne({ email });
  }

  // if author
  if (role === 'author') {
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
  createViewerToDB,
  createAuthorToDB,
  createAdminToDB,
  getMeFromDB,
  changeStatus,
};
