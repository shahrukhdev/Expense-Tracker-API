import { z } from "zod";

export const recurringExpenseSchema = z.object({

    title: z.string({ message: "Title field is required" }).min(2, 'Title must be at least 2 characters'),
    amount: z.number({ message: "Amount field is required" }),
    categoryId: z.string().optional(),
    frequency: z.string().optional(),
    nextDueDate: z.coerce.date().optional(),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type RecurringExpenseInput = z.infer<typeof recurringExpenseSchema>;