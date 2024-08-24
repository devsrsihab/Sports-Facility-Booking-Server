import { z } from 'zod';

// Define Zod schemas for subobjects
const UserNameValidationSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string(),
  lastName: z.string().min(1),
});

// create validation
const createAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: UserNameValidationSchema,
      image: z.string().url().optional(),
      email: z.string().email(),
    }),
  }),
});
// create validation
const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: UserNameValidationSchema.optional(),
      image: z.string().url().optional(),
      email: z.string().email().optional(),
    }),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
