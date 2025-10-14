import express from 'express'
import { addOrderController, getAllOrderController, getOrderById, requestCancellation, requestReturn } from '../../controllers/user/order.controller.js'
import { authenticateUser } from '../../middlewares/auth.middleware.js'

const router = express.Router()

router.use(authenticateUser)

router.post('', addOrderController)
router.get('', getAllOrderController)

router.get('/:id',getOrderById)

router.patch('/request-cancellation/:id',requestCancellation)
router.patch('/request-return/:id',requestReturn)
export default router