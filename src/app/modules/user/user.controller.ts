import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// viewer create controller
const createUser = catchAsync(async (req, res) => {
  const { user: userData } = req.body;
  const result = await UserServices.createUserToDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

// create admin controller
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: studetnData } = req.body;
  const result = await UserServices.createAdminToDB(password, studetnData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

// get me controller
const getMe = catchAsync(async (req, res) => {
  const { email, role } = req.user;
  const result = await UserServices.getMeFromDB(email, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get me retived successfully',
    data: result,
  });
});

// change status
const changeStatus = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.changeStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status change successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  createAdmin,
  getMe,
  changeStatus,
};
