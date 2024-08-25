import { z } from 'zod';

// create
const createBookingValidationSchema = z.object({
  body: z.object({
    facility: z.string(),
    user: z.string(),
    bookingDate: z.string(),
    startTime: z
      .string()
      .refine((time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time), 'Invalid start time format'), // Ensures startTime is in HH:MM format
    endTime: z
      .string()
      .refine((time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time), 'Invalid end time format'), // Ensures endTime is in HH:MM format
    totalAmount: z.number().positive().min(0.01, 'Total price must be greater than zero'), // Ensures totalPrice is a positive number
  }),
});

// update
const updateBookingValidationSchema = z.object({
  body: z.object({
    facility: z.string().optional(),
    user: z.string().optional(),
    bookingDate: z.string().optional(),
    startTime: z
      .string()
      .refine((time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time), 'Invalid start time format')
      .optional(),
    endTime: z
      .string()
      .refine((time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time), 'Invalid end time format')
      .optional(),
    totalAmount: z
      .number()
      .positive()
      .min(0.01, 'Total price must be greater than zero')
      .optional(),
  }),
});

export const BookingValidation = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};
