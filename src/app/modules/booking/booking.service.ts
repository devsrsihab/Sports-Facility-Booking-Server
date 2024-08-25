/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

// Create a Booking
const createBookings = async (bookingsData: TBooking) => {
  const result = await Booking.create(bookingsData);
  return result;
};

// Get all Bookingss
const getAllBookingss = async (query: Record<string, unknown>, userinfo: any) => {
  // Extract user object from query
  const user: any = userinfo || {};
  let BookingsQuery: any;

  // If the user is an admin, get all bookings
  if (user && user?.role === 'admin') {
    BookingsQuery = new QueryBuilder(Booking.find().populate('facility').populate('user'), query).filter().sort().paginate().fields();
  }
  else {
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
