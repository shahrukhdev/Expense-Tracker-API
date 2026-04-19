import Income from "../models/Income.js";
import { IncomeInput } from "../validations/income.validation.js";
import AppError from "../utils/AppError.js";

const getIncomes = async (userId: string, search?: string, page: number = 1, limit:number = 10) => {

    const query: any = { userId };

    if (search) {
        query.title = { $regex: search, $options: "i" };
    }

    const total = await Income.countDocuments(query);
    const skip = (page - 1) * limit;

    const incomes = await Income.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);

    return {
        data: incomes,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    }
}

const addIncome = async (userId: string, data: IncomeInput) => {

    const { title, source = "", amount = 0, date, description = "" } = data;

    const income = await Income.create({
        title,
        userId,
        source,
        amount,
        date,
        description
    });

    return income;
}

const updateIncome = async (userId: string, incomeId: string, data: IncomeInput) => {

    const income = await Income.findOne({ _id: incomeId, userId });

    if (!income) {
        throw new AppError('Income not found', 404);
    }

    if (data.title !== undefined) income.title = data.title;
    if (data.source !== undefined) income.source = data.source;
    if (data.amount !== undefined) income.amount = data.amount;
    if (data.date !== undefined) income.date = data.date;
    if (data.description !== undefined) income.description = data.description;

    await income.save();

    return income;
};

const deleteIncome = async (userId: string, incomeId: string) => {

    const income = await Income.findOneAndDelete({ _id: incomeId, userId });

    if (!income) {
        throw new AppError('Income not found', 404);
    }

    return income;
};

export default {
    getIncomes,
    addIncome,
    updateIncome,
    deleteIncome
};