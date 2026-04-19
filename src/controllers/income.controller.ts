import { Request, Response } from "express";
import incomeService from "../services/income.service.js";
import { IncomeInput } from "../validations/income.validation.js";
import { getParam } from "../utils/getParam.js";
import AppError from "../utils/AppError.js";

export const getIncomes = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;
        const search = req.query.search as string;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await incomeService.getIncomes(userId, search, page, limit);

        return res.status(200).json({
            success: true,
            message: "Incomes retrieved successfully",
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

export const addIncome = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;
        const body = req.body as IncomeInput;

        const income = await incomeService.addIncome(userId, body);

        return res.status(201).json({
            success: true,
            message: "Income added successfully",
            data: income
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again!"
        });
    }
};

export const updateIncome = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;
        const id = getParam(req, 'id');
        const body = req.body as IncomeInput;

        const income = await incomeService.updateIncome(userId, id, body);

        return res.status(200).json({
            success: true,
            message: "Income updated successfully",
            data: income
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

export const deleteIncome = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;
        const id = getParam(req, 'id');

        await incomeService.deleteIncome(userId, id);

        return res.status(200).json({
            success: true,
            message: "Income deleted successfully"
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