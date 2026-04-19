import { z } from "zod";

export const expenseSchema = z.object({
    title: z.string({ message: "Title field is required" }).min(2, 'Title must be at least 2 characters'),
    amount: z.number({ message: "Amount field is required" }),
    categoryId: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    paymentMethod: z.string().optional()

});

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type ExpenseInput = z.infer<typeof expenseSchema>;