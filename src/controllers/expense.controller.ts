import { Request, Response } from "express";
import expenseService from "../services/expense.service.js";
import { ExpenseInput } from "../validations/expense.validation.js";
import AppError from "../utils/AppError.js";
import { getParam } from "../utils/getParam.js";

export const getExpenses = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const search = req.query.search as string;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await expenseService.getExpenses(userId, search, page, limit);

        return res.status(200).json({
            success: true,
            message: "Expenses retrieved successfully",
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

export const addExpense = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;
        const body = req.body as ExpenseInput;

        const expense = await expenseService.addExpense(userId, body);

        return res.status(201).json({
            success: true,
            message: "Expense added successfully",
            data: expense
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again!"
        });
    }
};

export const updateExpense = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;
        const id = getParam(req, 'id');
        const body = req.body as ExpenseInput;

        const expense = await expenseService.updateExpense(userId, id, body);

        return res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: expense
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

export const deleteExpense = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;
        const id = getParam(req, 'id');
        
        await expenseService.deleteExpense(userId, id);

        return res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
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