import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// viewer create controller
const createAuthor = catchAsync(async (req, res) => {
  const { password, author: authorData } = req.body;
  const result = await UserServices.createAuthorToDB(password, authorData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author created successfully',
    data: result,
  });
});

// viewer create controller
const createViewer = catchAsync(async (req, res) => {
  const { password, viewer: viewerData } = req.body;
  const result = await UserServices.createViewerToDB(password, viewerData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'viewer created successfully',
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
  createViewer,
  createAuthor,
  createAdmin,
  getMe,
  changeStatus,
};
