import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";
import Income from "../models/Income.js";
import mongoose from "mongoose";

export const getTotalIncome = async (userId: string): Promise<number> => {
  const result = await Income.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId)  } },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" }
      }
    }
  ]);
  return result.length > 0 ? result[0]?.total : 0;
};

export const getTotalExpenses = async (userId: string): Promise<number> => {
  const result = await Expense.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" }
      }
    }
  ]);
  
  return result.length > 0 ? result[0]?.total : 0;
};

export const getTotalBudget = async (userId: string): Promise<number> => {
  const result = await Budget.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" }
      }
    }
  ]);

  return result.length > 0 ? result[0]?.total : 0;
};
