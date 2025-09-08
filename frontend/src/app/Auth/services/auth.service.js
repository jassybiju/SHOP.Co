import { axiosInstance } from "./api/axiosInstance";

export const registerUser = (data) => axiosInstance.post('/register',data)
export const verifyOtp = (data) => axiosInstance.post('/otp/verify', data)
export const loginUser = (data) => axiosInstance.post('/login', data)
export const logoutUser = () => axiosInstance.post('/logout')