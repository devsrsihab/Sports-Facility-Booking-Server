import mongoose from 'mongoose';
import { Viewer } from './viewer.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TViewer } from './viewer.interface';
import { viewerSearchableFields } from './viewer.constant';
import QueryBuilder from '../../builder/QueryBuilder';

// get all viewers
const getAllViewersFromDB = async (query: Record<string, unknown>) => {
  const viewerQuery = new QueryBuilder(Viewer.find(), query)
    .search(viewerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await viewerQuery.modelQuery;
  const meta = await viewerQuery.countTotal();
  return {
    meta,
    result,
  };
};

// get single viewer
const getSingleViewerFromDB = async (id: string) => {
  // const result = await Viewer.findOne({ id });
  const result = await Viewer.findOne({ id })
    .populate('admissionSemester')
  return result;
};

// update viewer
const updateViewerToDB = async (id: string, payload: Partial<TViewer>) => {
  const { name, ...remainingViewerData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = { ...remainingViewerData };

  // dynamic loop for name
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Viewer.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// get single viewer
const deleteViewerFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    // transaction
    session.startTransaction();

    const deletedViewer = await Viewer.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedViewer) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Viewer');
    }

    // deleted user
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedViewer;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Viewer');
  }
};

export const ViewerServices = {
  getAllViewersFromDB,
  getSingleViewerFromDB,
  updateViewerToDB,
  deleteViewerFromDB,
};
