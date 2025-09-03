import express from 'express'
import {  forgetPassword, registerUser, resendOTP, resetPassword, verifyOTP } from '../controllers/auth.controller.js'
import client from '../config/redisClient.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/forget-password', forgetPassword)

router.post('/otp/verify', verifyOTP)
router.post('/otp/resend', resendOTP)

router.patch('/password/reset', resetPassword)

export default router