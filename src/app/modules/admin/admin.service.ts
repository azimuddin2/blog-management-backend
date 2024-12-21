import { Register } from '../auth/auth.model';
import { Blog } from '../blog/blog.model';

const blockUserFromDB = async (id: string) => {
  const result = await Register.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );

  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const AdminServices = {
  blockUserFromDB,
  deleteBlogFromDB,
};
