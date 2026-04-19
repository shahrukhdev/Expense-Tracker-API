import { Request, Response } from 'express';
import authService from '../services/auth.service.js';
import type { RegisterInput, LoginInput, ForgotPasswordInput, ResetPasswordInput } from '../validations/auth.validation.js';
import AppError from '../utils/AppError.js';

export const register = async (req: Request, res: Response) => {
  try {
    const body = req.body as RegisterInput;

    const user = await authService.register(body);

    return res.status(201).json({
      success: true,
      message: 'User successfully registered.',
      data: user,
    });

  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
      return;
    }

    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again!',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const body = req.body as LoginInput;

    const result = await authService.login(body);

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: result,
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

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const body = req.body as ForgotPasswordInput;

    await authService.generateResetToken(body);

    return res.status(200).json({
      success: true,
      message: 'A reset link has been sent to your email.',
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

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const body = req.body as ResetPasswordInput;

    await authService.resetUserPassword(body);

    return res.status(200).json({
      success: true,
      message: 'Password has been reset successfully',
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

export const logout = async (req: Request, res: Response) => {

    try {
        return res.status(200).json({
            success: true,
            message: "Logout successful."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!',
        });
    }

};