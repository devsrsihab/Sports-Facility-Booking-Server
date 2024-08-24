import mongoose from 'mongoose';
import { Author } from './author.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TAuthor } from './author.interface';
import { authorSearchableFields } from './author.constant';
import QueryBuilder from '../../builder/QueryBuilder';

// get all authors
const getAllAuthorsFromDB = async (query: Record<string, unknown>) => {
  const authorQuery = new QueryBuilder(Author.find(), query)
    .search(authorSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await authorQuery.modelQuery;
  const meta = await authorQuery.countTotal();
  return {
    meta,
    result,
  };
};

// get single author
const getSingleAuthorFromDB = async (email: string) => {
  // const result = await Author.findOne({ id });
  const result = await Author.findOne({ email }).populate('admissionSemester');
  return result;
};

// update author
const updateAuthorToDB = async (id: string, payload: Partial<TAuthor>) => {
  const { name, ...remainingAuthorData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = { ...remainingAuthorData };

  // dynamic loop for name
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Author.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// get single author
const deleteAuthorFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    // transaction
    session.startTransaction();

    const deletedAuthor = await Author.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAuthor) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Author');
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
    return deletedAuthor;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Author');
  }
};

export const AuthorServices = {
  getAllAuthorsFromDB,
  getSingleAuthorFromDB,
  updateAuthorToDB,
  deleteAuthorFromDB,
};
