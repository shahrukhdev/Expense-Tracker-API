import { Request, Response } from 'express';
import categoryService from '../services/category.service.js';
import type { CategoryInput, UpdateCategoryInput } from '../validations/category.validation.js';
import { getParam } from '../utils/getParam.js';
import AppError from '../utils/AppError.js';

export const getCategories = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const search = req.query.search as string;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await categoryService.getCategories(userId, search, page, limit);

        return res.status(200).json({
            success: true,
            message: 'Categories retrieved successfully',
            data: result.data,
            pagination: result.pagination
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
            message: 'Something went wrong. Please try again!',
        });
  }
};

export const addCategory = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const body = req.body as CategoryInput;

        const category = await categoryService.addCategory(userId, body);

        return res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: category,
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
            message: 'Something went wrong. Please try again!',
        });
   }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const id = getParam(req, 'id');
        const body = req.body as UpdateCategoryInput;

        const category = await categoryService.updateCategory(userId, id, body);

        return res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: category,
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
            message: 'Something went wrong. Please try again!',
        });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id; 
        const id = getParam(req, 'id');

        await categoryService.deleteCategory(userId, id);

        return res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
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
            message: 'Something went wrong. Please try again!',
        });
    }
};