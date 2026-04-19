import { Router } from "express";
import authRoutes from "./routes/auth.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import incomeRoutes from "./routes/income.routes.js";
import recurringExpenseRoutes from "./routes/recurring.expense.routes.js";
import userRoutes from "./routes/user.routes.js"

const router = Router();

router.use('/auth', authRoutes);
router.use('/', budgetRoutes);
router.use('/', categoryRoutes);
router.use('/', dashboardRoutes);
router.use('/', expenseRoutes);
router.use('/', incomeRoutes);
router.use('/', recurringExpenseRoutes);
router.use('/', userRoutes);

export default router;



