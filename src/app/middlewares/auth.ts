import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import config from '../config';
import { TUserRole } from '../modules/auth/auth.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(401, 'You are not authorized!');
    }

    const token = authHeader.split(' ')[1];

    // checking if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const role = decoded.role;

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorized!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
