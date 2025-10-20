import express from 'express'
import { addCouponController, getAllCouponsController, getCouponByIdController, validateCouponController } from '../../controllers/admin/coupon-management.controller.js'
import { authenticateUser } from '../../middlewares/auth.middleware.js'
import { checkAdminRole } from '../../middlewares/admin.middleware.js'


const router = express.Router()

router.use(authenticateUser)
router.use(checkAdminRole)

router.post('/',addCouponController)
router.get('/',getAllCouponsController)
router.get('/:id',getCouponByIdController)

router.post("/validate",validateCouponController)


export default router