import Expense from "../models/Expense.js";
import { ExpenseInput } from "../validations/expense.validation.js";
import AppError from "../utils/AppError.js";
import { Types } from "mongoose";

const getExpenses = async (userId: string, search?: string, page: number = 1, limit: number = 10) => {

    const query: any = { userId };

    if (search) {
        query.title = { $regex: search, $options: "i" };
    }

    const total = await Expense.countDocuments(query);
    const skip = (page - 1) * limit;

    const expenses = await Expense.find(query).populate('categoryId', '_id name').sort({ createdAt: -1 }).skip(skip).limit(limit);

    return {
        data: expenses,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const addExpense = async (userId: string, data: ExpenseInput) => {

    const { title, amount, categoryId, description = "", date, paymentMethod } = data;

    const expense = await Expense.create({
        title,
        userId,
        amount,
        categoryId: categoryId ? new Types.ObjectId(categoryId) : undefined,
        description,
        date,
        paymentMethod,
    });

    return expense;
};

const updateExpense = async (userId: string, expenseId: string, data: ExpenseInput) => {

    const expense = await Expense.findOne({ _id: expenseId, userId });

    if (!expense) {
        throw new AppError('Expense not found.', 404);
    }

    if (data.title !== undefined) expense.title = data.title;
    if (data.amount !== undefined) expense.amount = data.amount;
    if (data.categoryId !== undefined) expense.categoryId = data.categoryId ? new Types.ObjectId(data.categoryId) : undefined;
    if (data.description !== undefined) expense.description = data.description;
    if (data.date !== undefined) expense.date = data.date;
    if (data.paymentMethod !== undefined) expense.paymentMethod = data.paymentMethod;

    await expense.save();

    return expense;
};

const deleteExpense = async (userId: string, expenseId: string) => {

    const expense = await Expense.findOneAndDelete({ _id: expenseId, userId  });

    if (!expense) {
        throw new AppError('Expense not found', 404);
    }

    return expense;
};

export default {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense
};