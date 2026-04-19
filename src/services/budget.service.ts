import Budget from "../models/Budget.js";
import { BudgetInput } from "../validations/budget.validation.js";
import AppError from "../utils/AppError.js";
import { Types } from "mongoose";

const getBudgets = async (userId: string, search?: string, page: number = 1, limit: number = 10) => {

    const query: any = { userId };

    if (search) {
        query.title = { $regex: search, $options: "i" };
    }

    const total = await Budget.countDocuments(query);
    const skip = (page - 1) * limit;

    const budgets  = await Budget.find(query).populate('categoryId', '_id name').sort({ createdAt: -1 }).skip(skip).limit(limit);

    return {
        data: budgets,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
}
 
const addBudget = async (userId: string, data: BudgetInput) => {

    const { title, categoryId, amount = 0, year } = data;

    const budget = await Budget.create({
        title,
        userId,
        categoryId: categoryId ? new Types.ObjectId(categoryId) : undefined,
        amount,
        year
    });

    return budget;
}

const updateBudget = async (userId: string, budgetId: string, data: BudgetInput) => {

    const budget = await Budget.findOne({ _id: budgetId, userId });

    if (!budget) {
        throw new AppError('Budget not found', 404);
    }

    if (data.title !== undefined) budget.title = data.title;
    if (data.categoryId !== undefined) budget.categoryId = data.categoryId ? new Types.ObjectId(data.categoryId) : undefined;
    if (data.amount !== undefined) budget.amount = data.amount;
    if (data.year !== undefined) budget.year = data.year;

    await budget.save();

    return budget;
};

const deleteBudget = async (userId: string, budgetId: string) => {

    const budget = await Budget.findOneAndDelete({ _id: budgetId, userId });

    if (!budget) {
        throw new AppError('Budget not found', 404);
    }

    return budget;
};

export default {
    getBudgets,
    addBudget,
    updateBudget,
    deleteBudget
};