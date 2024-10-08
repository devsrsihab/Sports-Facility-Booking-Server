import { z } from 'zod';

// create
const createFacilitieValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    location: z.string(),
    image: z.string(),
    description: z.string(),
    pricePerHour: z.number().positive().int(),
    availableSlots: z.number().positive().int(),
  }),
});

// update
const updateFacilitieValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    location: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.number().positive().int().optional(),
    availableSlots: z.number().positive().int().optional(),
  }),
});

export const FacilitieValidation = {
  createFacilitieValidationSchema,
  updateFacilitieValidationSchema,
};
