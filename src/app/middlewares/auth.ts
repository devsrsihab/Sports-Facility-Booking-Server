import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appError';
import httpStatus from 'http-status';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

// Middleware for authentication
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const auth = (...requiredUserRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenWithBearer = req.headers.authorization;
    const token = tokenWithBearer && tokenWithBearer.split(' ')[1];

    // Check if the token exists
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized token');
    }

    // user role checking
    const { role, email } = decoded as JwtPayload;
    // Retrieve the email of the user with the given email
    const userEmailDoc = await User.findOne({ email: email }).select('email');
    const userEmail = userEmailDoc?.email;

    if (!userEmail) {
      throw new AppError(httpStatus.NOT_FOUND, 'User email not found');
    }
    const user = await User.isUserExistByCustomIdOrEmail(userEmail);
    const isDeleted = user?.isDeleted;
    const isUserBlocked = user?.status === 'blocked';

    // user exist
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User is Not Found');
    }

    // check deleted
    if (isDeleted) {
      throw new AppError(httpStatus.NOT_FOUND, 'User is deleted');
    }

    // check block
    if (isUserBlocked) {
      throw new AppError(httpStatus.NOT_FOUND, 'User is blocked');
    }


    if (requiredUserRole && !requiredUserRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
