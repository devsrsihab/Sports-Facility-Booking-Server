import { z } from 'zod';



// create validation
const createAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: z.string().min(1),
      image: z.string().url().optional(),
      email: z.string().email(),
    }),
  }),
});
// create validation
const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: z.string().min(1).optional(),
      image: z.string().url().optional(),
      email: z.string().email().optional(),
    }),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
