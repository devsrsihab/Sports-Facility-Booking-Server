/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/appError';
import { Facilitie } from '../facilitie/facilitie.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { initialPayment } from '../payment/payments.utils';
import { randomUUID } from 'crypto';
import httpStatus from '../../../../node_modules/http-status/lib/index';

// Create a Booking
const createBookings = async (userEmail: any, bookingsData: TBooking) => {
  // Step 1: Fetch the facility details using the facility ID
  const facility = await Facilitie.findById(bookingsData.facility);
  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found');
  }

  // Step 2: Calculate the total amount
  const { startTime, endTime, bookingDate } = bookingsData;
  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);
  const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

  if (durationInHours <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'End time must be after start time.');
  }

  const totalAmount = durationInHours * facility.pricePerHour;

  // Step 3: Check if the slot is available
  const existingBookings = await Booking.find({
    facility: bookingsData.facility,
    bookingDate: bookingDate,
    $or: [
      {
        startTime: { $lt: endTime }, // Existing booking starts before the new booking ends
        endTime: { $gt: startTime }, // Existing booking ends after the new booking starts
      },
    ],
  });

  if (existingBookings.length > 0) {
    throw new AppError(httpStatus.CONFLICT, 'The time slot is already booked.');
  }

  // Step 4: Add the calculated totalAmount to the bookingsData
  bookingsData.totalAmount = totalAmount;
  bookingsData.transaction_id = randomUUID();

  // Step 5: Create the booking
  const newBooking = await Booking.create(bookingsData);

  const paymentInfo = {
    userEmail,
    amount: newBooking.totalAmount,
    tran_id: newBooking.transaction_id,
  };

  const payment = await initialPayment(paymentInfo);

  return payment;
};

// Get all Bookingss
const getAllBookingss = async (query: Record<string, unknown>, userinfo: any) => {
  // Extract user object from query
  const user: any = userinfo || {};
  let BookingsQuery: any;

  // If the user is an admin, get all bookings
  if (user && user?.role === 'admin') {
    BookingsQuery = new QueryBuilder(Booking.find().populate('facility').populate('user'), query)
      .filter()
      .sort()
      .paginate()
      .fields();
  } else {
    BookingsQuery = new QueryBuilder(
      Booking.find({ email: user.email }).populate('facility').populate('user'),
      query,
    )
      .filter()
      .sort()
      .paginate()
      .fields();
  }

  // Execute the query
  const result = await BookingsQuery.modelQuery;
  // Get query metadata
  const meta = await BookingsQuery.countTotal();

  // Return the result and metadata
  return {
    result,
    meta,
  };
};

// Get a Booking by ID
const getSingleBookings = async (bookingId: string): Promise<TBooking | null> => {
  const result = await Booking.findById(bookingId).populate('facility').populate('user');
  return result;
};

// Update a Booking
const updateBookings = async (
  bookingsId: string,
  updateData: Partial<TBooking>,
): Promise<TBooking | null> => {
  const result = await Booking.findByIdAndUpdate(bookingsId, updateData, {
    new: true,
  });
  return result;
};

// Delete a Booking
const deleteBookings = async (bookingId: string) => {
  // hard delete the booking
  const result = await Booking.findByIdAndDelete(bookingId);
  return result;
};

export const BookingsServices = {
  createBookings,
  getAllBookingss,
  getSingleBookings,
  updateBookings,
  deleteBookings,
};
