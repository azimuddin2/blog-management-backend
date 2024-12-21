import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';
import AppError from '../../errors/AppError';

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'The length of blog title can be minimum 3 characters'],
      maxlength: [80, 'The length of blog title can be maximum 80 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
      minlength: [5, 'The length of blog content can be minimum 5 characters'],
      maxlength: [
        1000,
        'The length of blog content can be maximum 1000 characters',
      ],
    },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is required'],
      unique: true,
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

blogSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isBlogExist = await Blog.findOne(query);

  if (!isBlogExist) {
    throw new AppError(404, 'This blog does not exist!');
  }

  next();
});

blogSchema.pre('findOneAndDelete', async function (next) {
  const query = this.getQuery();

  const isBlogExist = await Blog.findOne(query);

  if (!isBlogExist) {
    throw new AppError(404, 'This blog does not exist!');
  }

  next();
});

export const Blog = model<TBlog>('Blog', blogSchema);
