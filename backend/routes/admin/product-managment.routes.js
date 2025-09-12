import express from 'express'
import {addProduct} from '../../controllers/admin/product-management.controller.js'
import { authenticateUser } from '../../middlewares/auth.middleware.js'
import { checkAdminRole } from '../../middlewares/admin.middleware.js'
const router = express.Router()

router.use(authenticateUser)
router.use(checkAdminRole)

router.post('',addProduct)

export default router


