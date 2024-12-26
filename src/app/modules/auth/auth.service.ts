import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { TLoginUser, TRegisterUser } from './auth.interface';
import { Register } from './auth.model';
import config from '../../config';

const registerUser = async (payload: TRegisterUser) => {
  const filter = { email: payload.email };
  const userExists = await Register.findOne(filter);
  
  if (userExists) {
    throw new AppError(409, `${payload.email} already exists.`);
  }

  const result = await Register.create(payload);

  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await Register.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(404, 'This user is not found!');
  }

  // checking if the user if  already blocked
  const isBlocked = user?.isBlocked;
  if (isBlocked === true) {
    throw new AppError(403, 'This user is blocked!');
  }

  // checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(403, 'Password do not matched');
  }

  // create token and send to the client
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    token,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
};
