import express from 'express';
import { BlogControllers } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.get('/', auth(USER_ROLE.user), BlogControllers.getAllBlogs);

router.get('/:id', auth(USER_ROLE.user), BlogControllers.getSingleBlog);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

router.delete('/:id', auth(USER_ROLE.user), BlogControllers.deleteBlog);

export const BlogRoutes = router;
