import { z } from 'zod';

// Define name validation
const ViewerNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().max(20).optional(),
  lastName: z.string().min(1).max(20),
});

// create validation
const createViewerValidationSchema = z.object({
  body: z.object({
    viewer: z.object({
      name: ViewerNameValidationSchema,
      image: z.string().url().optional(),
      email: z.string().email(),
      dateOfBirth: z.string(),
    }),
  }),
});

// update validation
const updateViewerValidationSchema = z.object({
  body: z.object({
    viewer: z.object({
      name: ViewerNameValidationSchema.optional(),
      image: z.string().url().optional(),
      email: z.string().email().optional(),
      dateOfBirth: z.string().optional(),
    }),
  }),
});

export const ViewerValidations = {
  createViewerValidationSchema,
  updateViewerValidationSchema,
};
