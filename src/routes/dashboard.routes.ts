import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getDashboardSummary } from "../controllers/dashboard.controller.js";

const router = Router();

router.use(authenticate);

router.route('/dashboard/summary').get(getDashboardSummary);

export default router;