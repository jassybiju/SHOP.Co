import express from 'express'
import {  forgetPassword, getUserDetails, googleAuth, loginUser, logoutUser, registerUser, resendOTP, resetPassword, verifyOTP } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout',logoutUser)

router.post('/forget-password', forgetPassword)

router.post('/otp/verify', verifyOTP)
router.post('/otp/resend', resendOTP)

router.patch('/password/reset', resetPassword)

router.get('/me', getUserDetails)
router.get('/google',googleAuth)

export default router