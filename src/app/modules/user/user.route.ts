import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidations } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UserValidations } from './user.validation';

const router = express.Router();

// admin create
router.post(
  '/create-admin',
  auth(USER_ROLE.admin),
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);

// get me
router.get('/me', auth(USER_ROLE.admin, USER_ROLE.user), UserController.getMe);

// change status
router.patch(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidations.changeStatusValidationSchema),
  UserController.changeStatus,
);

export const UserRoute = router;
