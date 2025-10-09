import express from 'express'
import { authenticateUser } from '../middlewares/auth.middleware.js'
import { addCartController } from '../controllers/cart.controller.js'

const router = express.Router()

router.use(authenticateUser)

router.post('/',addCartController)


export default router
