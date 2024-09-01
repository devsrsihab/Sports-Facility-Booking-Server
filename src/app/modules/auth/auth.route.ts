import express from 'express';
import { AuthValidation } from './auth.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
import { UserValidations } from '../user/user.validation';
import { UserController } from '../user/user.controller';

const router = express.Router();

// user create
router.post(
  '/register-user',
  validateRequest(UserValidations.UserSchemaValidation),
  UserController.createUser,
);

// login
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidatonSchema),
  AuthControllers.loginUser,
);

// passwrod change
router.post(
  '/change-password',
  auth(USER_ROLE.admin),
  validateRequest(AuthValidation.changePasswordValidatonSchema),
  AuthControllers.changePassword,
);

// refresh token
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidatonSchema),
  AuthControllers.libraryRefreshToken,
);

// forget password
router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

// reset passwrod
router.post(
  '/reset-password',
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);

export const AuthRoute = router;
