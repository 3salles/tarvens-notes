import z from 'zod';

export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'validation.name.required' })
    .min(2, { message: 'validation.name.min' }),
  email: z
    .string()
    .min(1, { message: 'validation.email.required' })
    .check(z.email({ error: 'validation.email.invalid' })),
  password: z
    .string()
    .min(1, { message: 'validation.password.required' })
    .min(8, { message: 'validation.password.min' }),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
