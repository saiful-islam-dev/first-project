import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password much be string',
    })
    .max(20, { message: 'password can not be more then 20 charactors' })
    .optional(),
  needsPasswordChange: z.boolean().optional().default(true),
});

export const UserValidation = {
  userValidationSchema,
};
