import { axiosInstance } from "./api/axiosInstance";

export const registerUser = (data) => axiosInstance.post("/register", data);
export const verifyOtp = (data) => axiosInstance.post("/otp/verify", data);
export const loginUser =async (data) => {
    console.log(data)
    const res = await axiosInstance.post("/login", data);
    return res.data.data
};
export const logoutUser = () => axiosInstance.post("/logout");
export const fetchUser = async () => {
    const res = await axiosInstance.get("/me", { withCredentials: true });
    console.log(res.data);
    return res.data.data ;
};
