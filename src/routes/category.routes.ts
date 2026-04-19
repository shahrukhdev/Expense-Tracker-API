import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAuth } from "../middlewares/requireAuth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { categorySchema } from "../validations/category.validation.js";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";

const router = Router();

router.use(authenticate);
router.use(requireAuth); 

router.route('/categories').get(getCategories);
router.route('/categories').post(validate(categorySchema), addCategory);
router.route('/categories/:id').put(validate(categorySchema), updateCategory);
router.route('/categories/:id').delete(deleteCategory);

export default router;