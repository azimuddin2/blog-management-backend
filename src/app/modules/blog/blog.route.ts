import express from 'express';
import { BlogControllers } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);
router.get('/', BlogControllers.getAllBlogs);
router.get('/:id', BlogControllers.getSingleBlog);
router.patch(
  '/:id',
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);
router.delete('/:id', BlogControllers.deleteBlog);

export const BlogRoutes = router;
