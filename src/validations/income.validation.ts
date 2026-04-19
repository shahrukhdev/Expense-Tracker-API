import { z } from "zod";

export const incomeSchema = z.object({

    title: z.string({ message: "Title field is required" }).min(2, 'Title must be at least 2 characters'),
    source: z.string().optional(),
    amount: z.number({ message: "Amount field is required" }),
    date: z.coerce.date().optional(),
    description: z.string().optional(),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type IncomeInput = z.infer<typeof incomeSchema>;