import express from 'express'
import {addProduct, editProduct, getAllProducts, getProduct, toggleProduct} from '../../controllers/admin/product-management.controller.js'
import { authenticateUser } from '../../middlewares/auth.middleware.js'
import { checkAdminRole } from '../../middlewares/admin.middleware.js'
import upload from '../../middlewares/multer.js'
const router = express.Router()

router.use(authenticateUser)
router.use(checkAdminRole)

router.post('',upload.array('images',4),addProduct)
router.put('/:id',upload.array('images',4),editProduct)
router.get('',getAllProducts)
router.get('/:id', getProduct)

router.patch("/toggle-status/:id",toggleProduct)

export default router


// /api/admin/product/68ceb03e3e9ee5090a258869