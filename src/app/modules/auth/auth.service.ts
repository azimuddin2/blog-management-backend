import { TRegisterUser } from './auth.interface';
import { Register } from './auth.model';

const registerUser = async (payload: TRegisterUser) => {
  const result = await Register.create(payload);

  return result;
};

export const AuthServices = {
  registerUser,
};
