import express from 'express'
import { addOrderController, cancelOrderItemController, getAllOrderController, getOrderById, requestCancellation, requestReturn, requestReturnItemController, verifyPayment } from '../../controllers/user/order.controller.js'
import { authenticateUser } from '../../middlewares/auth.middleware.js'

const router = express.Router()

router.use(authenticateUser)

router.post('', addOrderController)
router.get('', getAllOrderController)

router.get('/:id',getOrderById)

router.patch('/request-cancellation/:id',requestCancellation)
router.patch('/:id/:itemId/cancel',cancelOrderItemController)
router.patch('/request-return/:id',requestReturn)
router.patch('/:id/:itemId/return',requestReturnItemController)

router.post('/verify-payment',verifyPayment)
export default router