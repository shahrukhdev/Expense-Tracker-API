import { Request, Response } from "express";
import userService from "../services/user.service.js";
import { UserInput } from "../validations/user.validation.js";
import AppError from "../utils/AppError.js";

export const getUsers = async (req: Request, res: Response) => {

    try {
        const users = await userService.fetchAllUsers();

        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again!"
        });
    }
};

export const getUser = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;

        const user = await userService.fetchUserById(userId);

        return res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: user
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

export const updateUser = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;
        const body = req.body as UserInput;

        const user = await userService.updateUserById(userId, body);

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user
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
