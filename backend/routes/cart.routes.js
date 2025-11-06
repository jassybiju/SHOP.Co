import express from 'express'
import { authenticateUser } from '../middlewares/auth.middleware.js'
import {  getAllCartController, removeCartController, updateCartController,  } from '../controllers/cart.controller.js'

const router = express.Router()

router.use(authenticateUser)

router.post('/',updateCartController)
router.delete('/:id' , removeCartController)
router.get('/', getAllCartController)

export default router
