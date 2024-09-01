import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingsControllers } from './booking.controller';
import { BookingValidation } from './booking.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Create Booking (POST)
router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingsControllers.createBookings,
);

// // Read All Bookings (GET)
router.get('/', auth(USER_ROLE.user, USER_ROLE.admin), BookingsControllers.getAllBookings);

// Read Single Booking (GET)
router.get('/:bookingId', BookingsControllers.getSingleBookings);

// Update Booking (PUT)
router.patch(
  '/:bookingId',
  validateRequest(BookingValidation.updateBookingValidationSchema),
  BookingsControllers.updateBookings,
);

// Delete Booking (DELETE)
router.delete('/:bookingId', BookingsControllers.deleteBookings);

export const BookingRoute = router;
