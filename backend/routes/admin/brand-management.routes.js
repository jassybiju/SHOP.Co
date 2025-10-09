import express from "express";
import upload from "../../middlewares/multer.js";
import { addBrand, editBrand, getAllBrand, getBrand } from "../../controllers/admin/brand-management.controller.js";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { checkAdminRole } from "../../middlewares/admin.middleware.js";



const router = express.Router();

router.use(authenticateUser);
router.use(checkAdminRole);

router.post("", upload.array("image", 1), addBrand);
router.get('', getAllBrand)
router.get('/:id', getBrand)
router.put('/:id',upload.array('image', 1), editBrand)

export default router;
