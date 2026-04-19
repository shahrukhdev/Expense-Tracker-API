import { Request } from 'express';
import AppError from './AppError.js';

export const getParam = (req: Request, key: string): string => {
  const value = req.params[key];
  if (!value || Array.isArray(value)) {
    throw new AppError(`Missing route parameter: ${key}`, 400);
  }
  return value;
};