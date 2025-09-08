import express from 'express'
import {  forgetPassword, getUserDetails, loginUser, logoutUser, registerUser, resendOTP, resetPassword, verifyOTP } from '../controllers/auth.controller.js'
import client from '../config/redisClient.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout',logoutUser)

router.post('/forget-password', forgetPassword)


router.post('/otp/verify', verifyOTP)
router.post('/otp/resend', resendOTP)

router.patch('/password/reset', resetPassword)

router.get('/me', getUserDetails)

export default router