import { Request, Response } from "express";
import dashboardService from "../services/dashboard.service.js";
import AppError from "../utils/AppError.js";

export const getDashboardSummary = async (req: Request, res: Response) => {

    try {
        const userId = req.user!.id;

        const data = await dashboardService.buildDashboardSummary(userId);

        return res.status(200).json({
            success: true,
            message: "Dashboard summary retrieved successfully",
            data: data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again!"
        });
    }
};

