import { z } from 'zod';

// create
const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    image: z.string().min(1),
  }),
});

// update
const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    image: z.string().min(1).optional(),
  }),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
