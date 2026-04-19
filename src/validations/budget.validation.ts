import { z } from "zod";

export const budgetSchema = z.object({

    title: z.string({ message: "Title field is required" }).min(2, 'Title must be at least 2 characters'),
    categoryId: z.string().optional(),
    amount: z.number({ message: "Amount field is required" }),
    year: z.string().optional()
});

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type BudgetInput = z.infer<typeof budgetSchema>;