import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string({ message: 'Name field is required' })
    .min(2, 'Name must be at least 2 characters'),

  icon: z.string().optional(),

  color: z
    .string()
    .optional()
    .default('#000000'),
});

export const updateCategorySchema = z.object({
  name: z.string().min(2).optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CategoryInput = z.infer<typeof categorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;