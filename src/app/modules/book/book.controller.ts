import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookServices } from './book.service';
import { User } from '../user/user.model';

// Create
const createBook = catchAsync(async (req, res) => {
  const bookData = req.body;
  const email = req?.user?.email;
  const user = await User.findOne({ email }, { _id: 1 });
  bookData.createdBy = user?._id;
  const result = await BookServices.createBook(bookData);
  // const result = 'none';
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

// Read All
const getAllBooks = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await BookServices.getAllBooks(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});


// get books by category
const getBooksByCategory = catchAsync(async (req, res) => {
  const {categoryName} = req.params;
  const result = await BookServices.getBooksByCategory(categoryName);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books by Category retrieved successfully',
    data: result,
  });
});

// Read One
const getSingleBook = catchAsync(async (req, res) => {
  const bookId = req.params.bookId;
  const result = await BookServices.getSingleBook(bookId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
});

// Update
const updateBook = catchAsync(async (req, res) => {
  const bookId = req.params.bookId;
  const updateData = req.body;
  const result = await BookServices.updateBook(bookId, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

// Delete
const deleteBook = catchAsync(async (req, res) => {
  const bookId = req.params.bookId;
  const result = await BookServices.deleteBook(bookId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const BookControllers = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  getBooksByCategory,
};
