import { z } from 'zod';

// Define name validation
const AuthorNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().max(20).optional(),
  lastName: z.string().min(1).max(20),
});

// create validation
const createAuthorValidationSchema = z.object({
  body: z.object({
    author: z.object({
      name: AuthorNameValidationSchema,
      image: z.string().url().optional(),
      email: z.string().email(),
      dateOfBirth: z.string(),
    }),
  }),
});

// update validation
const updateAuthorValidationSchema = z.object({
  body: z.object({
    author: z.object({
      name: AuthorNameValidationSchema.optional(),
      image: z.string().url().optional(),
      email: z.string().email().optional(),
      dateOfBirth: z.string().optional(),
    }),
  }),
});

export const AuthorValidations = {
  createAuthorValidationSchema,
  updateAuthorValidationSchema,
};
