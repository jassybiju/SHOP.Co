import express from "express";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { getAllUsers } from "../../controllers/admin/user-management.controller.js";
import { checkAdminRole } from "../../middlewares/admin.middleware.js";

const router = express.Router();

router.use(authenticateUser);
router.use(checkAdminRole)

router.get("/users", getAllUsers);

export default router;
