import { z } from 'zod';

// login validation
const loginValidatonSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
      invalid_type_error: 'email must be string',
    }),
    password: z.string({
      required_error: 'password is required',
      invalid_type_error: 'password must be string',
    }),
  }),
});

// password change
const changePasswordValidatonSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'old Password is required',
      invalid_type_error: 'old Password must be string',
    }),
    newPassword: z.string({
      required_error: 'password is required',
      invalid_type_error: 'password must be string',
    }),
  }),
});

// refresh token
const refreshTokenValidatonSchema = z.object({
  cookies: z.object({
    libraryRefreshToken: z.string({
      required_error: 'libraryRefreshToken is required',
      invalid_type_error: 'libraryRefreshToken must be string',
    }),
  }),
});

// forget password
const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'User email is required',
    }),
  }),
});

// reset password
const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'User email is required',
    }),
    newPassword: z.string({
      required_error: 'New Password  is required',
    }),
  }),
});

export const AuthValidation = {
  loginValidatonSchema,
  changePasswordValidatonSchema,
  refreshTokenValidatonSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
