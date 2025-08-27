import express from 'express'
import { registerUser, resendOTP, verifyOTP } from '../controllers/auth.controller.js'
import client from '../config/redisClient.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/otp/verify', verifyOTP)
router.post('/otp/resend', resendOTP)

export default router