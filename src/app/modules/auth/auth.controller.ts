/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';
import { UserServices } from '../user/user.service';

// register viewer
const registerViewer = catchAsync(async (req, res) => {
  const { password, viewer: viewerData } = req.body;
  const result = await UserServices.createViewerToDB(password, viewerData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Viewer Registered successfully',
    data: result,
  });
});

// register viewer
const registerAuthor = catchAsync(async (req, res) => {
  const { password, author: authorData } = req.body;
  const result = await UserServices.createAuthorToDB(password, authorData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author Registered successfully',
    data: result,
  });
});

// login user\
const loginUser = catchAsync(async (req, res) => {
  const result: any = await AuthServices.loginUser(req.body);
  const { libraryRefreshToken, accessToken, neetPassWord } = result;

  // save refresh token in cookie
  res.cookie('libraryRefreshToken', libraryRefreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'login successfully',
    data: { accessToken, neetPassWord },
  });
});

// change password
const changePassword = catchAsync(async (req, res) => {
  const user = req?.user;
  const { ...passwordData } = req.body;
  const result = await AuthServices.changePassword(user, passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});

// refresh token
const libraryRefreshToken = catchAsync(async (req, res) => {
  const { libraryRefreshToken } = req.cookies;

  console.log('libraryRefreshToken ==>', libraryRefreshToken);

  const result = await AuthServices.libraryRefreshToken(libraryRefreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'access token retrive successfully',
    data: result,
  });
});

// forget password
const forgetPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await AuthServices.forgetPassword(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password Reset Link generated successfully',
    data: result,
  });
});

// reset password
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization as string;
  const result = await AuthServices.resetPassword(req.body, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password Reset successfully',
    data: result,
  });
});

export const AuthControllers = {
  registerViewer,
  registerAuthor,
  loginUser,
  changePassword,
  libraryRefreshToken,
  forgetPassword,
  resetPassword,
};
