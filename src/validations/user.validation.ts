import { z } from "zod";

// Reusable Fields
const emailField = z
  .string({ message: 'Email field is required' })
  .email('Please provide a valid email address')
  .toLowerCase()
  .optional();

const passwordField = z
  .string({ message: 'Password field is required' })
  .min(8, 'Password must be at least 8 characters')
  .max(32, 'Password must not exceed 32 characters')
  .optional();

export const userSchema = z
  .object({
    name: z
      .string({ message: 'Name field is required' })
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters')
      .optional(),

    email: emailField,
    password: passwordField,

    confirmPassword: z
      .string({ message: 'Confirm password is required' })
      .optional(),
  })
    .superRefine((data, ctx) => {
    if (!data.password) return;

    if (!data.confirmPassword) {
        ctx.addIssue({
        path: ['confirmPassword'],
        code: "custom",
        message: 'Confirm password is required when password is provided',
        });
        return;
    }

    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
        path: ['confirmPassword'],
        code: "custom",
        message: 'Passwords do not match',
        });
    }
    });

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type UserInput = z.infer<typeof userSchema>;