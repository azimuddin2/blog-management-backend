import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(80),
    content: z.string().min(5).max(1000),
    author: z.string(),
    isPublished: z.boolean().default(true),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(80).optional(),
    content: z.string().min(5).max(1000).optional(),
    author: z.string().optional(),
    isPublished: z.boolean().default(true).optional(),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
