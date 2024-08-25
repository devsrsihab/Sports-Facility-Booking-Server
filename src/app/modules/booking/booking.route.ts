import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingsControllers } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();

// Create Booking (POST)
router.post(
  '/',
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingsControllers.createBookings,
);

// // Read All Bookings (GET)
router.get('/', BookingsControllers.getAllBookings);
// router.get('/Bookingebycat/:categoryName', BookingControllers.getBookingsByCategory);

// Read Single Booking (GET)
router.get('/:facilitieId', BookingsControllers.getSingleBookings);

// Update Booking (PUT)
router.patch(
  '/:facilitieId',
  validateRequest(BookingValidation.updateBookingValidationSchema),
  BookingsControllers.updateBookings,
);

// Delete Booking (DELETE)
router.delete('/:facilitieId', BookingsControllers.deleteBookings);

export const BookingRoute = router;
