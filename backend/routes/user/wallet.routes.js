import express from 'express'
import { authenticateUser } from '../../middlewares/auth.middleware.js'
import { addMoneyController, getWalletController, verifyAddMoneyController } from '../../controllers/user/wallet.controller.js'

const router = express.Router()

router.use(authenticateUser)

router.get('/', getWalletController )
router.post('/', addMoneyController)

router.post('/validate', verifyAddMoneyController)

export default router