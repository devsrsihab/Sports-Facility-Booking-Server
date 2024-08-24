/* eslint-disable @typescript-eslint/no-explicit-any */
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AuthorServices } from './author.service';

// get all author conroller
const getAuthor = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await AuthorServices.getAllAuthorsFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'author get successfully',
    meta: result.meta,
    data: result.result,
  });
});

// get single author controller
const getSingleAuthor = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await AuthorServices.getSingleAuthorFromDB(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single author get successfully',
    data: result || 'no data found',
  });
});

// update author controller
const updateAuthor = catchAsync(async (req, res) => {
  const { authorId } = req.params;
  const { author } = req.body;
  const result = await AuthorServices.updateAuthorToDB(authorId, author);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'author updated successfully',
    data: result || 'no data found',
  });
});

// delte single author controller
const deleteAuthor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AuthorServices.deleteAuthorFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'author deleted successfully',
    data: result,
  });
});

export const AuthorController = {
  getAuthor,
  getSingleAuthor,
  updateAuthor,
  deleteAuthor,
};
