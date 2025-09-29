import express from "express";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { getAllUsers, getUsersById, toggleUserState } from "../../controllers/admin/user-management.controller.js";
import { checkAdminRole } from "../../middlewares/admin.middleware.js";

const router = express.Router();

router.use(authenticateUser);
router.use(checkAdminRole)

router.get("/users", getAllUsers);
router.get("/users/:id", getUsersById);
router.patch("/users/toogle-state/:id", toggleUserState);


export default router;
