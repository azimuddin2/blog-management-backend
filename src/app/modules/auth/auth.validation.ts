import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(6, { message: 'The length of name can be minimum 3 characters' })
      .max(12, { message: 'The length of name can be maximum 20 characters' }),

    email: z
      .string({ required_error: 'Email is required' })
      .email('Please enter a valid email'),

    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be string',
      })
      .min(6, { message: 'Password can be minimum 6 characters' })
      .max(20, { message: 'Password can not be more than 20 characters' }),

    role: z.enum(['admin', 'user']).default('user'),
    isBlocked: z.boolean().default(false),
  }),
});

export const AuthValidations = {
  registerUserValidationSchema,
};
