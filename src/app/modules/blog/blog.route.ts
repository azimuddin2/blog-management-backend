import express from 'express';
import { BlogControllers } from './blog.controller';

const router = express.Router();

router.post('/', BlogControllers.createBlog);
router.get('/', BlogControllers.getAllBlogs);
router.get('/:id', BlogControllers.getSingleBlog);
router.patch('/:id', BlogControllers.updateBlog);
router.delete('/:id', BlogControllers.deleteBlog);

export const BlogRoutes = router;
