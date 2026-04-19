import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { requireAuth } from "../middlewares/requireAuth.middleware.js";
import { expenseSchema } from "../validations/expense.validation.js";
import { getExpenses, addExpense, updateExpense, deleteExpense } from "../controllers/expense.controller.js";

const router = Router();

router.use(authenticate);
router.use(requireAuth);

router.route('/expenses').get(getExpenses);
router.route('/expenses').post(validate(expenseSchema), addExpense);
router.route('/expenses/:id').put(validate(expenseSchema), updateExpense);
router.route('/expenses/:id').delete(deleteExpense);

export default router;