import { z } from 'zod';

// create
const createBookingValidationSchema = z.object({
  body: z.object({
    facility: z.string(),
    bookingDate: z.string(),
    startTime: z
      .string()
      .refine((time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time), 'Invalid start time format') // Ensures startTime is in HH:MM format
      .refine((time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours >= 6 && hours <= 18 && !(hours === 18 && minutes > 0);
      }, 'Start time must be between 06:00 and 18:00'),
    endTime: z
      .string()
      .refine((time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time), 'Invalid end time format') // Ensures endTime is in HH:MM format
      .refine((time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours >= 6 && hours <= 18 && !(hours === 18 && minutes > 0);
      }, 'End time must be between 06:00 and 18:00'),
  }),
});
// update
const updateBookingValidationSchema = z.object({
  body: z.object({
    facility: z.string().optional(),
    bookingDate: z.string().optional(),
    startTime: z
      .string()
      .refine((time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time), 'Invalid start time format')
      .optional(),
    endTime: z
      .string()
      .refine((time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time), 'Invalid end time format')
      .optional(),
  }),
});

export const BookingValidation = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};
