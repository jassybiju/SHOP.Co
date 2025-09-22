import { axiosInstance } from "./api/axiosInstance";

export const registerUser = async (data) => {
    const res = await axiosInstance.post("/register", data);
    return res.data;
};

export const loginUser = async (data) => {
    console.log(data);
    const res = await axiosInstance.post("/login", data);
    return res.data.data;
};

export const forgetPassword = async (data) => {
    const res = await axiosInstance.post("/forget-password", data);
    console.log(res.data)
    return res.data;
};
export const verifyOtp = async (data) => {
    const res = await axiosInstance.post("/otp/verify", data);
    return res.data;
};

export const resendOtp = async (data) => {
    const res = await axiosInstance.post("otp/resend", data);
    return res.data
};

export const resetPassword = async(data)=>{
    console.log(data , 21322)
const res = await axiosInstance.patch('password/reset', data)
    return res.data
}

export const logoutUser = () => axiosInstance.post("/logout");

export const fetchUser = async () => {
    const res = await axiosInstance.get("/me", { withCredentials: true });
    console.log(res.data);
    return res.data.data;
};


export const googleAuth = async (code) => {
    const res = await axiosInstance.get('/google?code='+code)
    return res.data
}

