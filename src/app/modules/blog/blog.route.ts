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
router.get('/', auth(USER_ROLE.admin), BlogControllers.getAllBlogs);
router.get('/:id', BlogControllers.getSingleBlog);
router.patch(
  '/:id',
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);
router.delete('/:id', BlogControllers.deleteBlog);

export const BlogRoutes = router;
