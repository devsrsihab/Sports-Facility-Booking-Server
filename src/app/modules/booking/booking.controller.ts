import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingsServices } from './booking.service';

// Create
const createBookings = catchAsync(async (req, res) => {
  const bookingsData = req.body;
  const result = await BookingsServices.createBookings(bookingsData);
  // const result = 'none';
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Bookings created successfully',
    data: result,
  });
});

// Read All
const getAllBookings = catchAsync(async (req, res) => {
  const query = req.query;
 const userinfo = req.user || {};

  const result = await BookingsServices.getAllBookingss(query, userinfo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookingss retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});



// Read One
const getSingleBookings = catchAsync(async (req, res) => {
  const { bookingId } = req.params;
  const result = await BookingsServices.getSingleBookings(bookingId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Bookings retrieved successfully',
    data: result,
  });
});

// Update
const updateBookings = catchAsync(async (req, res) => {
  const {bookingId} = req.params;
  const updateData = req.body;

  const result = await BookingsServices.updateBookings(bookingId, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings updated successfully',
    data: result,
  });
});

// Delete
const deleteBookings = catchAsync(async (req, res) => {
  const {bookingId} = req.params;
  const result = await BookingsServices.deleteBookings(bookingId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings deleted successfully',
    data: result,
  });
});

export const BookingsControllers = {
  createBookings,
  getAllBookings,
  getSingleBookings,
  updateBookings,
  deleteBookings,
};
