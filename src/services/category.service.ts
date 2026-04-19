import Budget from '../models/Budget.js';
import Category from '../models/Category.js';
import Expense from '../models/Expense.js';
import RecurringExpense from '../models/RecurringExpense.js';
import AppError from '../utils/AppError.js';
import type { CategoryInput } from '../validations/category.validation.js';
import type { UpdateCategoryInput } from '../validations/category.validation.js';

const getCategories = async (userId: string, search?: string, page: number = 1, limit: number = 10) => {

  const query: any = { userId };

    if (search) {
        query.name = { $regex: search, $options: "i" };
    }

    const total = await Category.countDocuments(query);
    const skip = (page - 1) * limit;

    const categories = await Category.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);

    return {
        data: categories,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const addCategory = async (userId: string, data: CategoryInput) => {
  const { name, icon = '', color = '#000000' } = data;

  const existing = await Category.findOne({ userId, name });

  if (existing) {
    throw new AppError('Category already exists.', 409);
  }

  const category = await Category.create({
    userId,
    name,
    icon,
    color,
  });

  return category;
};

const updateCategory = async (
  userId: string,
  categoryId: string,
  data: UpdateCategoryInput
) => {
  const category = await Category.findOne({ _id: categoryId, userId });

  if (!category) {
    throw new AppError('Category not found.', 404);
  }

  if (data.name && data.name !== category.name) {
    const existing = await Category.findOne({
      userId,
      name: data.name,
    });

    if (existing) {
      throw new AppError('Category name already exists.', 409);
    }
  }

  if (data.name !== undefined) category.name = data.name;
  if (data.icon !== undefined) category.icon = data.icon;
  if (data.color !== undefined) category.color = data.color;

  await category.save();

  return category;
};

const deleteCategory = async (userId: string, categoryId: string) => {
  const category = await Category.findOneAndDelete({
    _id: categoryId,
    userId,
  });
  
  if (!category) {
    throw new AppError('Category not found.', 404);
  }

  // Remove Category ID from relevant documents

  await Budget.updateMany({ categoryId }, { $unset: { categoryId: "" } } );
  await Expense.updateMany({ categoryId }, { $unset: { categoryId: "" } } );
  await RecurringExpense.updateMany({ categoryId}, { $unset: { categoryId: "" } } );

  return category;
};

export default {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};