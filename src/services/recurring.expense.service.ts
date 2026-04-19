import RecurringExpense from "../models/RecurringExpense.js";
import { RecurringExpenseInput } from "../validations/recurring.expense.validation.js";
import AppError from "../utils/AppError.js";
import { Types } from "mongoose";

const getRecurringExpenses = async (userId: string, search?: string, page: number = 1, limit: number = 10) => {

    const query: any = { userId };

    if (search) {
        query.title = { $regex: search, $options: "i" };
    }

    const total = await RecurringExpense.countDocuments(query);
    const skip = (page - 1) * limit;

    const recurringExpenses = await RecurringExpense.find(query).populate('categoryId', '_id name').sort({ createdAt: -1 }).skip(skip).limit(limit);

    return {
        data: recurringExpenses,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    }
}

const addRecurringExpense = async (userId: string, data: RecurringExpenseInput) => {

    const { title, amount = 0, categoryId, frequency, nextDueDate } = data;

    const recurringExpense = await RecurringExpense.create({
        title,
        userId,
        amount,
        categoryId: categoryId ? new Types.ObjectId(categoryId) : undefined,
        frequency,
        nextDueDate
    });

    return recurringExpense;
}

const updateRecurringExpense = async (userId: string, recurringExpenseId: string, data: RecurringExpenseInput) => {

    const recurringExpense = await RecurringExpense.findOne({ _id: recurringExpenseId, userId });

    if (!recurringExpense) {
        throw new AppError('Recurring expense not found', 404);
    }

    if (data.title !== undefined) recurringExpense.title = data.title;
    if (data.amount !== undefined) recurringExpense.amount = data.amount;
    if (data.categoryId !== undefined) recurringExpense.categoryId = data.categoryId ? new Types.ObjectId(data.categoryId) : undefined;
    if (data.frequency !== undefined) recurringExpense.frequency = data.frequency;
    if (data.nextDueDate !== undefined) recurringExpense.nextDueDate = data.nextDueDate;

    await recurringExpense.save();

    return recurringExpense;
};

const deleteRecurringExpense = async (userId: string, recurringExpenseId: string) => {

    const recurringExpense = await RecurringExpense.findOneAndDelete({ _id: recurringExpenseId, userId });

    if (!recurringExpense) {
        throw new AppError('Recurring expense not found', 404);
    }

    return recurringExpense;
};

export default {
    getRecurringExpenses,
    addRecurringExpense,
    updateRecurringExpense,
    deleteRecurringExpense
};