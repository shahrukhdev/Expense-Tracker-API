import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAuth } from "../middlewares/requireAuth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { userSchema } from "../validations/user.validation.js";
import { getUsers, getUser, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.use(authenticate);
router.use(requireAuth);

router.route('/users').get(getUsers);
router.route('/user').get(getUser);
router.route('/update-user').post(validate(userSchema), updateUser);

export default router;