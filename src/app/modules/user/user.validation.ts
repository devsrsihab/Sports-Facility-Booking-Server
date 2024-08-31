import { z } from 'zod';
import { USER_STATUS } from './user.constant';

// user Schema validation
const UserSchemaValidation = z.object({
  body: z.object({
    user: z.object({
      password: z
        .string({
          invalid_type_error: 'Password must be a string',
        })
        .max(20, 'Password should be 20 Character')
        .min(8, 'Password should be 8 Character')
        .optional(),
      name: z.string().min(1),
      image: z.string().url().optional(),
      email: z.string().email(),
    }),
  }),
});

// change status validation
const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...USER_STATUS] as [string, ...string[]]),
  }),
});

export const UserValidations = { UserSchemaValidation, changeStatusValidationSchema };
