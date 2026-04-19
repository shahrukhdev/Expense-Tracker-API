import { Request, Response } from "express";
import budgetService from "../services/budget.service.js";
import { BudgetInput } from "../validations/budget.validation.js";
import { getParam } from "../utils/getParam.js";
import AppError from "../utils/AppError.js";

export const getBudgets = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;
        const search = req.query.search as string;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await budgetService.getBudgets(userId, search, page, limit);

        return res.status(200).json({
            success: true,
            message: "Budgets retrieved successfully",
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

export const addBudget = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;
        const body = req.body as BudgetInput;

        const budget = await budgetService.addBudget(userId, body);

        return res.status(201).json({
            success: true,
            message: "Budget added successfully",
            data: budget
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again!"
        });
    }
};

export const updateBudget = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;
        const id = getParam(req, 'id');
        const body = req.body as BudgetInput;

        const budget = await budgetService.updateBudget(userId, id, body);

        return res.status(200).json({
            success: true,
            message: "Budget updated successfully",
            data: budget
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

export const deleteBudget = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;
        const id = getParam(req, 'id');

        await budgetService.deleteBudget(userId, id);

        return res.status(200).json({
            success: true,
            message: "Budget deleted successfully"
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