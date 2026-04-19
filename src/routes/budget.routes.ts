import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { requireAuth } from "../middlewares/requireAuth.middleware.js";
import { budgetSchema } from "../validations/budget.validation.js";
import { getBudgets, addBudget, updateBudget, deleteBudget } from "../controllers/budget.controller.js";

const router = Router();

router.use(authenticate);
router.use(requireAuth);

router.route('/budgets').get(getBudgets);
router.route('/budgets').post(validate(budgetSchema), addBudget);
router.route('/budgets/:id').put(validate(budgetSchema), updateBudget);
router.route('/budgets/:id').delete(deleteBudget);

export default router;