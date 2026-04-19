import { Request, Response } from "express";
import recurringExpenseService from "../services/recurring.expense.service.js";
import { RecurringExpenseInput } from "../validations/recurring.expense.validation.js";
import { getParam } from "../utils/getParam.js";
import AppError from "../utils/AppError.js";

export const getRecurringExpenses = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;
        const search = req.query.search as string;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await recurringExpenseService.getRecurringExpenses(userId, search, page, limit);

        return res.status(200).json({
            success: true,
            message: "Recurring expenses retrieved successfully",
            data: result.data,
            pagination: result.pagination
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again!"
        });
    }
};

export const addRecurringExpense = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;
        const body = req.body as RecurringExpenseInput;

        const recurringExpense = await recurringExpenseService.addRecurringExpense(userId, body);

        return res.status(201).json({
            success: true,
            message: "Recurring expense added successfully",
            data: recurringExpense
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again!"
        });
    }
};

export const updateRecurringExpense = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;
        const id = getParam(req, 'id');
        const body = req.body as RecurringExpenseInput;

        const recurringExpense = await recurringExpenseService.updateRecurringExpense(userId, id, body);

        return res.status(200).json({
            success: true,
            message: "Recurring expense updated successfully",
            data: recurringExpense
        });

    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again!"
        });
    }
};

export const deleteRecurringExpense = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;
        const id = getParam(req, 'id');

        await recurringExpenseService.deleteRecurringExpense(userId, id);

        return res.status(200).json({
            success: true,
            message: "Recurring expense deleted successfully"
        });

    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again!"
        });
    }
};