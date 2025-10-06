import express from 'express'
import { authenticateUser } from '../../middlewares/auth.middleware.js';
import { checkAdminRole } from '../../middlewares/admin.middleware.js';
import { addCategory, editCategory, getAllCategories, getCategory, toggleCategoryStatus } from '../../controllers/admin/category-management.controller.js';

const router = express.Router()

router.use(authenticateUser);
router.use(checkAdminRole);

router.post("",  addCategory);
router.get("", getAllCategories );
router.get("/:id", getCategory );
router.put("/:id", editCategory );
router.patch("/toggle/:id", toggleCategoryStatus );


export default router