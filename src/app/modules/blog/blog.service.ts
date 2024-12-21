import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog, authorId: string) => {
  const newBlog = {
    title: payload.title,
    content: payload.content,
    author: authorId,
  };
  const result = await Blog.create(newBlog);
  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await Blog.find().populate('author').select('-password');
  return result;
};

const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const isBlogExists = await Blog.findById(id);
  if (!isBlogExists) {
    throw new AppError(404, `This Blog id ${id} does not exists`);
  }

  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });

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

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
