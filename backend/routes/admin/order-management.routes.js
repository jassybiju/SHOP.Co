import express from 'express'
import { authenticateUser } from '../../middlewares/auth.middleware.js'
import { checkAdminRole } from '../../middlewares/admin.middleware.js'
import { getAllOrdersController, getOrderController, updateOrderStatus } from '../../controllers/admin/order-management.controller.js'


const router = express.Router()

router.use(authenticateUser)
router.use(checkAdminRole)

router.get('',getAllOrdersController)
router.get('/:id',getOrderController)

router.patch('/:id', updateOrderStatus)

export default router