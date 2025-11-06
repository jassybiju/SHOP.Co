import { authAxiosInstance } from "@/lib/axios";

export const registerUser = async (data) => {
    const res = await authAxiosInstance.post("/register", data);
    return res.data;
};

export const loginUser = async (data) => {
    console.log(data);
    const res = await authAxiosInstance.post("/login", data);
    console.log(res.data.data, 888)
    return res.data.data;
};

export const forgetPassword = async (data) => {
    const res = await authAxiosInstance.post("/forget-password", data);
    console.log(res.data)
    return res.data;
};
export const verifyOtp = async (data) => {
    const res = await authAxiosInstance.post("/otp/verify", data);
    return res.data;
};

export const resendOtp = async (data) => {
    const res = await authAxiosInstance.post("otp/resend", data);
    return res.data
};

export const resetPassword = async(data)=>{
    console.log(data , 21322)
const res = await authAxiosInstance.patch('password/reset', data)
    return res.data
}

export const logoutUser = () => authAxiosInstance.post("/logout");

export const fetchUser = async () => {
    const res = await authAxiosInstance.get("/me", { withCredentials: true });
    console.log(res.data);
    return res.data.data;
};


export const googleAuth = async (code) => {
    const res = await authAxiosInstance.get('/google?code='+code)
    return res.data
}

