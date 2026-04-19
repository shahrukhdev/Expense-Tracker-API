import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.id) {
    throw new AppError("Unauthorized", 401);
  }
  next();
};