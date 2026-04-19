import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAuth } from "../middlewares/requireAuth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { incomeSchema } from "../validations/income.validation.js";
import { getIncomes, addIncome, updateIncome, deleteIncome } from "../controllers/income.controller.js";

const router = Router();

router.use(authenticate);
router.use(requireAuth);

router.route('/incomes').get(getIncomes);
router.route('/incomes').post(validate(incomeSchema), addIncome);
router.route('/incomes/:id').put(validate(incomeSchema), updateIncome);
router.route('/incomes/:id').delete(deleteIncome);

export default router;