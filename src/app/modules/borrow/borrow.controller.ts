import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BorrowingServices } from './borrow.service';
import { User } from '../user/user.model';

// Create
const createBorrowing = catchAsync(async (req, res) => {
  const borrowingData = req.body;
  const email = req?.user?.email;
  const user = await User.findOne({ email }, { _id: 1 });
  borrowingData.user = user?._id;

  const result = await BorrowingServices.createBorrowing(borrowingData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book Borrowing successfully',
    data: result,
  });
});

// Read All
const getAllBorrowings = catchAsync(async (req, res) => {
  const email = req?.user?.email;
  const user = await User.findOne({ email }, { id: 1 }); // Ensure you are querying by `_id`

  if (user) {
    const result = await BorrowingServices.getAllBorrowings(user._id.toString()); // Pass the `user._id` to getAllBorrowings
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Borrowings retrieved successfully',
      data: result,
    });
  } else {
    // Handle the case where the user is not found
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'User not found',
      data: null,
    });
  }
});

// Read One
const getBorrowingSingle = catchAsync(async (req, res) => {
  const { borrowId } = req.params;
  const result = await BorrowingServices.getSingleBorrowingFromDB(borrowId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Borrowing retrieved successfully',
    data: result,
  });
});

// Update
const updateBorrowing = catchAsync(async (req, res) => {
  const borrowingId = req.params.borrowingId;
  const updateData = req.body;
  const result = await BorrowingServices.updateBorrowing(borrowingId, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Borrowing updated successfully',
    data: result,
  });
});

// Delete
const deleteBorrowing = catchAsync(async (req, res) => {
  const { borrowId } = req.params;
  const result = await BorrowingServices.deleteBorrowing(borrowId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Borrowing deleted successfully',
    data: result,
  });
});

export const BorrowingControllers = {
  createBorrowing,
  getAllBorrowings,
  getBorrowingSingle,
  updateBorrowing,
  deleteBorrowing,
};
