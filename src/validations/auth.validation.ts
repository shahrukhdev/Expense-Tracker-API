import { z } from "zod";

// ─── Reusable Fields ──────────────────────────────────────────────────────────

const emailField = z
    .string({ message: 'Email field is required' })
    .email('Please provide a valid email address')
    .toLowerCase();

const passwordField = z
  .string({ message: 'Password field is required' })
  .min(8, 'Password must be at least 8 characters')
  .max(32, 'Password must not exceed 32 characters');

// ─── Register ─────────────────────────────────────────────────────────────────

export const registerSchema = z
  .object({
    name: z
      .string({ message: 'Name field is required' })
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters'),
    email: emailField,
    password: passwordField,
    confirmPassword: z
      .string({ message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// ─── Login ─────────────────────────────────────────────────────────────────

export const loginSchema = z
  .object({
    email: emailField,
    password: passwordField,
  });

// ─── Forgot Password ─────────────────────────────────────────────────────────────────

export const forgotPasswordSchema = z
  .object({
    email: emailField,
  });

// ─── Reset Password ─────────────────────────────────────────────────────────────────

export const resetPasswordSchema = z
  .object({
    email: emailField,
    password: passwordField,
    confirmPassword: z
      .string({ message: 'Confirm password is required' }),
    token: z
      .string({ message: 'Token is required' })
  })
    .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;