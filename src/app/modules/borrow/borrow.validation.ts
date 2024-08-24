import { z } from 'zod';

// Regular expression for validating MongoDB ObjectId
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

// create
const createBorrowvalidationSchema = z.object({
  body: z.object({
    book: z.string().regex(objectIdPattern),
    borrowedDate: z.string().min(1).max(50),
    returnDate: z.string().min(1).max(50),
  }),
});

// update
const updateBorrowValidationSchema = z.object({
  body: z.object({
    book: z.string().regex(objectIdPattern).optional(),
    user: z.string().regex(objectIdPattern).optional(),
    borrowedDate: z.string().min(1).max(50).optional(),
    returnDate: z.string().min(1).max(50).optional(),
  }),
});

export const BorrowBookValidation = {
  createBorrowvalidationSchema,
  updateBorrowValidationSchema,
};
