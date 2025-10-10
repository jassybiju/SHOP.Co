import express from 'express'
import { authenticateUser } from '../../middlewares/auth.middleware.js'
import { checkoutController } from '../../controllers/user/checkout.controller.js'

const router = express.Router()

router.use(authenticateUser)

router.get("/",checkoutController)

export default router