import QueryBuilder from '../../builder/QueryBuilder';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

// Create a Booking
const createBookings = async (bookingsData: TBooking) => {
  const result = await Booking.create(bookingsData);
  return result;
};

// Get all Bookingss
const getAllBookingss = async (query: Record<string, unknown>) => {
  const BookingsQuery = new QueryBuilder(Booking.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await BookingsQuery.modelQuery;
  const meta = await BookingsQuery.countTotal();
  return {
    result,
    meta,
  };
};

// Get a Booking by ID
const getSingleBookings = async (BookingsId: string): Promise<TBooking | null> => {
  const result = await Booking.findById(BookingsId);
  return result;
};

// Update a Booking
const updateBookings = async (
  BookingsId: string,
  updateData: Partial<TBooking>,
): Promise<TBooking | null> => {
  const result = await Booking.findByIdAndUpdate(BookingsId, updateData, {
    new: true,
  });
  return result;
};

// Delete a Booking
const deleteBookings = async (BookingsId: string) => {
  const deleteBookings = await Booking.findByIdAndUpdate(BookingsId, { isDeleted: true });
  return deleteBookings;
};

export const BookingsServices = {
  createBookings,
  getAllBookingss,
  getSingleBookings,
  updateBookings,
  deleteBookings,
};
