import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAuth } from "../middlewares/requireAuth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { recurringExpenseSchema } from "../validations/recurring.expense.validation.js";
import { getRecurringExpenses, addRecurringExpense, updateRecurringExpense, deleteRecurringExpense } from "../controllers/recurring.expense.controller.js";

const router = Router();

router.use(authenticate);
router.use(requireAuth);

router.route('/recurring-expenses').get(getRecurringExpenses);
router.route('/recurring-expenses').post(validate(recurringExpenseSchema), addRecurringExpense);
router.route('/recurring-expenses/:id').put(validate(recurringExpenseSchema), updateRecurringExpense);
router.route('/recurring-expenses/:id').delete(deleteRecurringExpense);

export default router;