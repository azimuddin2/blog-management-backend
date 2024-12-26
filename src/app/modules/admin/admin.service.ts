import AppError from '../../errors/AppError';
import { Register } from '../auth/auth.model';
import { Blog } from '../blog/blog.model';

const blockUserFromDB = async (id: string) => {
  const isUserExists = await Register.findById(id);
  if (!isUserExists) {
    throw new AppError(404, `This user id ${id} does not exists`);
  }

  const result = await Register.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );

  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const isBlogExists = await Blog.findById(id);
  if (!isBlogExists) {
    throw new AppError(404, `This Blog id ${id} does not exists`);
  }

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const AdminServices = {
  blockUserFromDB,
  deleteBlogFromDB,
};
