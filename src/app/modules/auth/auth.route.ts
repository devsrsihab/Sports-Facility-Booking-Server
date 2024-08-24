import express from 'express';
import { AuthValidation } from './auth.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
import { ViewerValidations } from '../viewer/viewer.validation';
import { AuthorValidations } from '../author/author.validation';

const router = express.Router();

// register
router.post(
  '/register-viewer',
  validateRequest(ViewerValidations.createViewerValidationSchema),
  AuthControllers.registerViewer,
);

// register
router.post(
  '/register-author',
  validateRequest(AuthorValidations.createAuthorValidationSchema),
  AuthControllers.registerAuthor,
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
  auth(USER_ROLE.admin, USER_ROLE.viewer),
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
